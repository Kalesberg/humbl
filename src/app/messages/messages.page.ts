import { Component } from '@angular/core';
import { Platform, NavController, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { SettingsService } from '../services/settings.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import { MessageService } from '../services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-items',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss'],
})
export class MessagesPage {
  single: any[];
  //view: any[] = [300, 300];
  showLegend = true;
  legendPosition = 'below';
  legendTitle = 'Coin Variance';

  colorScheme = {
    domain: ['#ffffff', '#ffd31a']
  };

  public received_messages: any;
  public sent_messages: any;
  public userId: string;
  public allMessages: any = [];
  public currentUser: any;
  public userProfile: any;
  public businessEmail: string;
  public businessName: string;
  public externalAddress: any = null;
  public loading: any;
  constructor( public messageService: MessageService, private http: HttpClient,
    public navCtrl: NavController, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public toast: ToastController, 
    public platform: Platform, public settingsService: SettingsService,
    public loadingCtrl: LoadingController, public appHelperService: AppHelperService,
    private translate : TranslateService) {  
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
          this.businessEmail = this.userProfile.businessEmail;
          this.businessName = this.userProfile.businessName;
          this.getMessages();
      });  
    });    
  }

  ionViewDidLoad(){
  }

  getMessages(event = null) {
    this.received_messages = [];
    this.sent_messages = [];
    let receive_loaded = false, sent_loaded = false;
    firebase.firestore().collection(`messages`).where('receiver_id', '==', this.currentUser)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
            this.received_messages.push({...doc.data(), id: doc.id });
          });
          receive_loaded = true;
          if(event && sent_loaded){
            event.target.complete()
          }
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
          receive_loaded = true;
          if(event && sent_loaded)
            event.target.complete()
      });

    firebase.firestore().collection(`messages`).where('sender_id', '==', this.currentUser)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
            this.sent_messages.push({...doc.data(), id: doc.id });
          });
          sent_loaded = true;
          if(event && receive_loaded)
            event.target.complete()
      })
      .catch(function(error) {
          sent_loaded = true
          console.log("Error getting documents: ", error);
          if(event && receive_loaded)
            event.target.complete()
      });
  }

  async reply_message(message){
    const alert = await this.alertCtrl.create({
      header: `${this.translate.instant("messages.header")} ${message.sender_name.toUpperCase()}`,
      inputs: [
        {
          name: 'message',
          id: 'paragraph',
          type: 'textarea',
          placeholder: this.translate.instant("messages.enter")
        }
      ],
      buttons: [
        {
          text: this.translate.instant("messages.cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.translate.instant("messages.send"),
          handler: data => {
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'secret-key'
              })
            };
            let message_data = {sender_id: this.currentUser, sender_name: this.userProfile.businessName, receiver_name: message.sender_name, receiver_id: message.sender_id, message: data.message, toMerchant: false, sent: new Date()};
            // console.log(message_data)
            this.http.post('https://us-central1-humbl-lite.cloudfunctions.net/sendMessage', message_data, httpOptions).subscribe(res => {
              console.log('res ', res)
            }, err => {
              console.log('err', err)
            })
            console.log(data.message);
          }
        }
      ]
    });

    await alert.present();
  }

  async delete_message(message){
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("messages.message"),
      message: this.translate.instant("txdeail.sure"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
          }
        },
        {
          text: this.translate.instant("items.delete"),
          cssClass: 'primary',
          handler: () => {
            this.messageService.removeMessage(message.id);
            this.getList();
          }
        },
      ]
    });
    return await alert.present();
  }

  // filterItems(searchTerm){
  //   return this.transactions.filter((item) => {
  //       return item.txId.indexOf(searchTerm) > -1;
  //   });    
  // }

  getList(){
    this.settingsService
      .getBusinessProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.businessEmail = this.userProfile.businessEmail;
        this.getMessages();
      }); 
  }

  async presentConfirmSuccess() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("reports.refund_success"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    return await alert.present();
  }

  async presentProcessing() {
    this.loading = await this.loadingCtrl.create({
      message: this.translate.instant("reports.refund_process")
    });
    return await this.loading.present();
  }

}
