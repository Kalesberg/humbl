import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataPassService } from '../services/data-pass.service';
import { AddItemsComponent } from '../add-items/add-items.component';
import { CoinSelectComponent } from '../coin-select/coin-select.component';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public items = [];
  public sum: number = 0.00;
  public currency: any;
  public businessEmail: any;
  public userProfile: any;
  public currentUser: any;
  public stripe: string;
  public coin: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
    public loadingCtrl: LoadingController, public storage: Storage, 
    private settingsService: SettingsService, public alertCtrl: AlertController, 
    private dataPass: DataPassService, public router: Router) {
      
  }

  ionViewWillEnter() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
      } 
      this.settingsService
      .getBusinessProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        if(this.userProfile){
          this.businessEmail = this.userProfile.businessEmail;
          this.currency = this.userProfile.currency;
          this.stripe = this.userProfile.stripeId;
          if(!this.stripe){
            this.presentWarning();
          }
        }
      });
    });
  }

  async presentWarning() {
    let alert = await this.alertCtrl.create({
      header: 'Welcome to HUMBL®',
      message: 'Connect to Stripe in Settings.',
      buttons: [
        {
          text: 'Visit Settings',
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl('/settings');
          }
        }
      ]  
    });
    return await alert.present();
  }

  async addItem() {
    const addModal = await this.modalCtrl.create({
      component: AddItemsComponent,
      componentProps: { }
    });
    addModal.onDidDismiss().then((item: any) => {
      if (item.data) {
        this.saveItem(item.data);
      }
    });
    return await addModal.present();
  }

  async selectCoin() {
    let addModal = await this.modalCtrl.create({
      component: CoinSelectComponent,
      componentProps: { }
    });
    addModal.onDidDismiss().then((coin: any) => {
      switch(coin.data){
        case "cash":
            this.coin = coin.data;
            this.toTx();
            break;  
        default:
          this.coin = 'card';
          this.toTx();
      }
    });
    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
    this.calculatePrice();
  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.calculatePrice();
  }

  calculatePrice() {
    this.sum = this.items.reduce((total, item) => {
    return total + item.price;
    }, 0);
  }

  toTx() {

    let subtotal = {
      usd: this.sum,
      list: this.items,
      coin: this.coin
    };
    console.log(subtotal);
    this.dataPass.passedItems = subtotal;
    if(this.coin === 'card'){
      this.coin = '';
      this.navCtrl.navigateForward('charge-card');
    } else if (this.coin === 'cash'){
      this.coin = ''
      this.navCtrl.navigateForward('charge-cash');
    } else {
      this.coin = ''
      this.navCtrl.navigateForward('transact');
    }
    this.reset();
  }

  reset() {
    this.items = [];
    this.calculatePrice();
  }

  // async confirmAddress() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Please Complete Your Settings.',
  //     buttons: [
  //       {
  //         text: 'Settings',
  //         handler: () => {
  //           this.navCtrl.navigateForward('settings');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // async confirmAddressExists() {
  //   const alert = await this.alertCtrl.create({
  //     header: `You Must Connect to Stripe`,
  //     message: `Connect in the Settings`,
  //     buttons: [
  //       {
  //         text: 'Settings',
  //         handler: () => {
  //           this.navCtrl.navigateForward('settings');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}
