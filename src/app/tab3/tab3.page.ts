import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {environment} from '../../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { CryptoService } from '../services/crypto.service';
import { TranslateService } from '@ngx-translate/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public business: string = null;
  public businessEmail: string = null;
  public username: string = null;
  public externalAddress: any = null;
  public externalLTCAddress: any = null;
  public externalBTCAddress: any = null;
  public externalXLMAddress: any = null;
  public externalDAIAddress: any = null;
  public externalLiquidAddress: any = null;
  public externalLiquidLTCAddress: any = null;
  public externalLiquidBTCAddress: any = null;
  public externalLiquidXLMAddress: any = null;
  public userProfile: any = null;
  public taxRate: number = null;
  public optionalTax: boolean;
  public currency: string = 'USD';
  public liquidateDGB: boolean = false;
  public liquidateLTC: boolean = false;
  public liquidateBTC: boolean = false;
  public liquidateXLM: boolean = false;
  public currentUser: any;
  public stripeId: string;
  public downloadURL: any;
  public imageURL: any;
  public uploadPercent: any;
  public logo: string;
  public businessAddress: string;
  public coordinates: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public storage: Storage, public toast: ToastController, private router: Router,
    private settingsService: SettingsService,
    private afStorage: AngularFireStorage,
    public changeRef: ChangeDetectorRef,
    public crypto: CryptoService,
    private translate : TranslateService,
    public appHelperService: AppHelperService) {

    this.storage.get('myTax').then((data) => {
        this.taxRate = data;
      });

    this.storage.get('myOptionalTax').then((data) => {
        this.optionalTax = !data ? false : data;
      });

  }

  ionViewWillEnter(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
      }
      this.settingsService
      .getBusinessProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.username = this.userProfile.email;
        this.currency = this.userProfile.currency;
        this.stripeId = this.userProfile.stripeId;
        console.log(this.stripeId)
        if(!this.currency){
          this.currency = 'USD';
          this.saveCurrency();
        }
        this.imageURL = this.userProfile.logoUrl;
        if(!this.imageURL){
          this.imageURL = `../../assets/avatar.png`;
        }
        this.business = this.userProfile.businessName;
        this.businessAddress = this.userProfile.businessAddress;
        this.businessEmail = this.userProfile.businessEmail;
        this.coordinates = this.userProfile.coordinates;
      });
    });
  }

  openPlaid(){
    let handler: any;
    handler.open();
  }

  async logoutToast() {
    const toast = await this.toast.create({
      message: this.translate.instant("settings.logout"),
      position: 'middle',
      duration: 1000,
      color: 'light',
    });
    toast.present();
  }

  async saveBusiness(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant("settings.your_business"),
      inputs: [
        {
          type: 'text',
          name: 'businessName',
          placeholder: this.translate.instant("settings.your_business"),
          value: this.business,
        }
      ],
      buttons: [
        {
          text: this.translate.instant("settings.cancel"),
          role: 'cancel'
        }, {
          text: this.translate.instant("settings.save"),
          handler: (data) => {
            this.business = data.businessName.trim().toLowerCase();
            //this.storage.set('myBusiness', this.business);
            this.settingsService.updateName(this.business);
            this.presentToast();
          },
        },
      ],
    });
    await alert.present();
  }

  async saveEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant("settings.your_business"),
      inputs: [
        {
          type: 'text',
          name: 'businessEmail',
          placeholder: this.translate.instant("settings.your_business"),
          value: this.businessEmail,
        }
      ],
      buttons: [
        {
          text: this.translate.instant("settings.cancel"),
          role: 'cancel'
        }, {
          text: this.translate.instant("settings.save"),
          handler: (data) => {
            this.businessEmail = data.businessEmail.toLowerCase().trim();
            //this.storage.set('myBusinessEmail', this.businessEmail);
            this.settingsService.updateBusinessEmail(this.businessEmail);
            this.presentToast();
          },
        },
      ],
    });
    await alert.present();
  }

  saveBusinessAddress(){
    if(!this.businessAddress.includes('#')){
      this.saveCoordinates();
    } else{
      this.addressAlert();
    }
  }

  saveCoordinates(){
    this.crypto.getCoordinates(this.businessAddress).then((res: any) =>{
      console.log(res.results[0].geometry);
      if(res.results[0].geometry){
        this.settingsService.updateCoordinates(res.results[0].geometry.location);
        this.settingsService.updateBusinessAddress(this.businessAddress);
      }
    })
  }

  async addressAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant("settings.special"),
      message: this.translate.instant("settings.special_message"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel'
        }
      ],
    });
    await alert.present();
  }

  saveCurrency(){
    this.settingsService.updateCurrency(this.currency);
  }

  editOptionalTax(){
    this.storage.set('myOptionalTax', this.optionalTax);
  }

  editTaxRate(){
    this.storage.set('myTax', this.taxRate);
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: this.translate.instant("settings.saved"),
      position: 'middle',
      duration: 1000,
      color: 'dark',
    });
    toast.present();
  }

  toListMasterPage() {
    this.appHelperService.activeUrl = '/merchant/pos';
    this.navCtrl.navigateForward('/merchant/pos');
  }

  toQR() {
    this.appHelperService.activeUrl = '/merchant/qr';
    this.navCtrl.navigateForward('/merchant/qr');
}

  goToHelp(): void {
      location.href = `mailto:support@humbl.io`;
  }

  stripe(){
    location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${environment.stripe_client}&scope=read_write`;
  }

  upload(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.currentUser}/${event.target.files[0].name}`;
    //const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    setTimeout(()=>{
      this.uploadPercent = null;
      this.getDownloadUrl(event.target.files[0].name);
    }, 3500);
  }

  getDownloadUrl(file: any){
    const filePath = `images/${this.currentUser}/${file}`;
    const fileRef = this.afStorage.ref(filePath);
    this.downloadURL = fileRef.getDownloadURL();
    this.downloadURL.toPromise().then((res: any)=>{
      this.imageURL = res;
      this.settingsService.updateLogo(this.imageURL);
      this.presentToast();
    });
  }

  removeImages(){
    if(this.imageURL != ''){
      this.afStorage.storage.refFromURL(this.imageURL).delete();
      this.imageURL = '';
      this.settingsService.updateLogo(this.imageURL);
      this.imageURL = `../../assets/avatar.png`;
      this.changeRef.detectChanges();
    }
  }

  async disconnectStripe(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant("settings.disconnect_stripe"),
      message: this.translate.instant("settings.disconnect_message"),
      buttons: [
        {
          text: this.translate.instant("settings.cancel"),
          role: 'cancel'
        }, {
          text: this.translate.instant("settings.disconnect"),
          handler: () => {
            this.stripeId = null;
            this.settingsService.updateStripeId(this.stripeId);
            this.presentToast();
          },
        },
      ],
    });
    await alert.present();
  }
}