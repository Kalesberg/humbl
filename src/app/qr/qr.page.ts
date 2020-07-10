import { Component, ɵPlayerFactory} from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import * as CryptoJs from 'crypto-js';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {
  public userProfile: any;
  public username: string;
  public business: string;
  public businessEmail: string;
  public logo: string;
  public imageURL: string;
  public user: boolean = false;
  public qrAPI: string = 'https://api.qrserver.com/v1/create-qr-code/%3Fsize=250x250%26color=22ade4%26data=';
  public emailURL: string;
  public qrForOptions:any =null;
  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public imgSrc: string = ""

  constructor(
    public router: Router,
    private settingsService: SettingsService,
    public alertCtrl: AlertController,
    public platform: Platform,
    public emailComposer: EmailComposer,
    private translate : TranslateService,
    private route: ActivatedRoute,
    public nav: NavController,
    public storage: Storage) {
    //this.getLocalData();
  }

  ionViewDidEnter(){
    this.getLocalData();
  }

  async getLocalData(){
    let qrLocalData = await this.storage.get('barcodestandee');
    console.log(qrLocalData);
    let qrdata = await JSON.parse(qrLocalData)
    console.log(qrdata)
    this.imgSrc = qrdata.imgSrc;
    this.qrForOptions = qrdata.qroptions;
    this.selectedColor =  (this.qrForOptions && this.qrForOptions.qrcolor) ? this.qrForOptions.qrcolor : "#22ade4";
  }

  ionViewWillEnter(){
    this.authCheck();
  }

  authCheck(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.user = true;
          console.log(this.user);
          this.getProfile();
          resolve(this.user);
          
        } else {
          this.user = false;
          console.log(this.user);
          resolve(this.user);
        }
      });
    });
  }

  getProfile(){
    this.settingsService
    .getBusinessProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
      if(this.userProfile){
        let username = this.userProfile.email;
        this.username = "merchant-" + CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(username));
        this.emailURL = `${this.qrAPI}${this.username}`;
        this.businessEmail = this.userProfile.businessEmail;
        this.imageURL = this.userProfile.logoUrl;
        this.business = this.userProfile.businessName;
        if(!this.imageURL){
          this.logo = '../../assets/avatar.png';
        } else{
          this.logo = this.imageURL;
        }
      }
    });
  }

  print(){
   window.print();
  }

  async presentEmailPrompt() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("qr.header"),
      message: this.translate.instant("qr.message"),
      inputs: [
        {
          name: 'email',
          placeholder: this.translate.instant("qr.email"),
          type: 'email'
        }
      ],
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          handler: () => {
           
          }
        },
        {
          text: this.translate.instant("qr.send"),
          handler: (data: any) => {
            this.emailReceipt(data.email);
          } 
        }
      ]
    });
    return await alert.present();
  }


  emailReceipt(data: any){
    console.log(this.username)
    let email = {
      to: data,
      subject: `${this.business} QR`,
      body: `${this.translate.instant("qr.body")} ${this.username}. ${this.translate.instant("qr.or")} ${this.emailURL}`,
      isHtml: false
    }
    if(this.platform.is('ios') || this.platform.is('android')){
      this.emailComposer.open(email);
    } else {
      this.sendEmail(email);
    }
  }

  sendEmail(email: any) {
    window.location.href = `mailto:${email.to}?subject=${email.subject}&body=${email.body}`;
  }

  async next(){
    let barcodeData = {
      imgSrc: this.imgSrc,
      qrData: this.username,
      qroptions: this.qrForOptions
    }
    this.storage.set('barcodestandee',JSON.stringify(barcodeData));
    this.nav.navigateForward('/qr-standee');    
  }
  back(){
    this.nav.back();
  }
}
