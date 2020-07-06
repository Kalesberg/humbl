import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataPassService } from '../services/data-pass.service';
import { SettingsService } from '../services/settings.service';
// import { Md5 } from "md5-typescript";
// import { environment } from 'src/environments/environment';
import { AlertController, NavController, Platform } from '@ionic/angular';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ReportService } from '../services/report.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { mobiscroll,  MbscNumpadDecimalOptions } from '@mobiscroll/angular';
mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light'
};

@Component({
  selector: 'app-charge-cash',
  templateUrl: './charge-cash.page.html',
  styleUrls: ['./charge-cash.page.scss'],
})
export class ChargeCashPage implements OnInit {
  myToken: any = null;
  card: any;
  cardDetails: any;
  amount: number = 0;
  currency: any;
  decoded1: any;
  subtotal: number = 0;
  items: any = {};
  coin: string = 'cash';
  output: any = '';
  optionalTax: boolean;
  taxRate: number = 0;
  tax: number = 0;
  userProfile: any;
  business: any;
  businessEmail: string;
  hash: any;
  logo: any;
  stripeId: any = null;
  tx: string;
  receipt: string;
  email: string;
  success: boolean = null;
  change: any;
  received: any;
  public uid: any;
  note: string = "None";
  numpadSettings:  MbscNumpadDecimalOptions;

  constructor(
    public storage: Storage,
    private dataPass: DataPassService,
    private settingsService: SettingsService,
    private alertCtrl: AlertController,
    public reportService: ReportService,
    public navCtrl: NavController,
    public platform: Platform,
    public emailComposer: EmailComposer) { 
      if(this.dataPass.passedItems.usd !== null || 
        this.dataPass.passedItems.usd !== undefined){
        this.subtotal = parseFloat(this.dataPass.passedItems.usd);
      }
      if(this.dataPass.passedItems.list !== null || 
        this.dataPass.passedItems.usd !== undefined){
        this.items = this.dataPass.passedItems.list;
        this.output = this.items.map((i: any) => {
          return `${i.description}` || '';
        });
      }
      if(this.dataPass.passedItems.coin !== null || 
        this.dataPass.passedItems.usd !== undefined){
        this.coin = this.dataPass.passedItems.coin;
      }
        
      this.storage.get('myOptionalTax').then((data) => {
          this.optionalTax = !data ? false : data;
        });   
      
      this.storage.get('myTax').then((data) => {
          if(this.optionalTax === false){
            this.taxRate = 0.00;
            this.tax = this.taxRate * this.subtotal;
            this.amount = this.subtotal + this.tax;
          } else {
            this.taxRate = !data ? 0.00 : data;
            this.tax = this.taxRate * this.subtotal;
            this.amount = this.subtotal + this.tax;
          }
        });
        
      this.numpadSettings = {
        preset: 'decimal',
        min: 0,
        max: 5000,
        prefix: '$'
      };  
    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.uid = user.uid;
      }
      this.settingsService
        .getBusinessProfile()
        .get()
        .then( async userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.stripeId = this.userProfile.stripeId;
          this.business = this.userProfile.businessName;
          this.currency = this.userProfile.currency;
          this.businessEmail = this.userProfile.businessEmail.toLowerCase();
          this.logo = this.userProfile.logoUrl;
          if(!this.logo){
            this.logo = `../../avatar.png`;
          }
        });
    });   
  }

  getChange(){
    if(this.received >= this.amount){
      this.change = this.received - this.amount;
    } else {
      this.change = 0.00;
    }
  }

  async presentConfirmSuccess() {
    let alert = await this.alertCtrl.create({
      header: 'Transaction Successful!',
      message: 'Would you like a receipt?',
      inputs: [
        {
          name: 'email',
          placeholder: 'Customer Email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.storeTransactionData();
            this.navCtrl.navigateBack('pos');
          }
        },
        {
          text: 'Receipt',
          handler: data => {
            this.storeTransactionData();
            this.email = data.email;
            this.emailReceipt(this.email);
            this.navCtrl.navigateBack('pos');
          } 
        }
      ]
    });
    return await alert.present();
  }

  emailReceipt(data){
    let email = {
      to: data,
      subject: `Your Receipt from ${this.business}`,
      body: `Total: $${this.amount}, Purchased: ${this.output}, TxID: ${this.tx}.
      We appreciate your business, ${this.business}.`,
      isHtml: true
    }
    if(this.platform.is('ios') || this.platform.is('android')){
      this.emailComposer.open(email);
    } else {
      this.sendEmail(email);
    }
  }

  sendEmail(email) {
    window.location.href = `mailto:${email.to}?subject=${email.subject}&body=${email.body}`;
  }

  storeTransactionData() {
    let pass = {
      txId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      usdTotal: this.amount,
      coin: this.coin,
      tip: 0,
      items: this.output
    }; 
    this.reportService.createTransaction(pass);
  }

}
