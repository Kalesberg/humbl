import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Stripe } from '@ionic-native/stripe/ngx';
import { Storage } from '@ionic/storage';
import { DataPassService } from '../services/data-pass.service';
import { SettingsService } from '../services/settings.service';
import { AlertController, NavController, LoadingController, Platform, ModalController } from '@ionic/angular';
import { ReportService } from '../services/report.service';
import * as firebase from 'firebase/app';
import {ScannerComponent} from '../scanner/scanner.component';
import 'firebase/firestore';
import * as CryptoJs from 'crypto-js';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-charge-card',
  templateUrl: './charge-card.page.html',
  styleUrls: ['./charge-card.page.scss']
})
export class ChargeCardPage {

  myToken: any = null;
  card: any;
  cardDetails: any;
  amount: number = 0;
  currency: any;
  decoded1: any;
  subtotal: number = 0;
  items: any = {};
  coin: string = 'card';
  output: any = 'Card Purchase';
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
  loading: any;
  uid: any;
  qr: boolean = false;
  qrScanner: any;
  videoElem: any;
  note: string = "None";
  public tip: boolean = false;
  public tipAmount: number;
  public tipDisplay: number = 0;
  public total: number;
  public symbol: string = '';
  public fee: number = 25;

  constructor(
    public stripe: Stripe,
    private http: HttpClient,
    public storage: Storage,
    private dataPass: DataPassService,
    private settingsService: SettingsService,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public reportService: ReportService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public emailComposer: EmailComposer) { 
      if(this.dataPass.passedItems.usd !== null || 
        this.dataPass.passedItems.usd !== undefined){
        this.subtotal = parseFloat(this.dataPass.passedItems.usd);
        console.log(this.subtotal)
      }
      if(this.dataPass.passedItems.list !== null || 
        this.dataPass.passedItems.list !== undefined){
        this.items = this.dataPass.passedItems.list;
        this.output = this.items.map((i: any) => {
          return `${i.description}` || '';
        });
      }
      if(this.dataPass.passedItems.coin !== null || 
        this.dataPass.passedItems.coin !== undefined){
        this.coin = this.dataPass.passedItems.coin;
      }
        
      this.storage.get('myOptionalTax').then((data) => {
          this.optionalTax = !data ? false : data;
        });   
      
      this.storage.get('myTax').then((data) => {
        if(this.optionalTax === false){
          this.taxRate = 0;
          this.tax = this.taxRate * this.subtotal;
          this.total = this.subtotal + parseFloat(this.tax.toFixed(2)) + (this.fee / 100);
          console.log(this.total, '1')
        } else {
          this.taxRate = !data ? 0 : data;
          this.tax = this.taxRate * this.subtotal;
          this.total = this.subtotal + parseFloat(this.tax.toFixed(2)) + (this.fee / 100);
          console.log(this.total, "2")

        }
      });
  }

  ionViewWillEnter(){
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.uid = user.uid;
      }
      this.settingsService
        .getBusinessProfile()
        .get()
        .then(userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.stripeId = this.userProfile.stripeId;
          this.business = this.userProfile.businessName;
          this.currency = this.userProfile.currency;
          this.logo = this.userProfile.logoUrl;
          this.businessEmail = this.userProfile.businessEmail.toLowerCase();
          this.logo = this.userProfile.logoUrl;
          if(!this.logo){
            this.logo = `../../avatar.png`;
          }
          if(this.currency === 'USD'){
            this.symbol = '$';
          } else {
            this.symbol = this.currency;
          }
          // this.calculateFee();
        });
    });   
  }

  ionViewWillLeave(){
    this.tip = false;
    this.tipAmount = null;
    this.tipDisplay = 0;
    this.total = 0;
  }

  // makePayment(token) {
  //   this.presentProcessing();
  //     console.log(token, this.currency.toLowerCase(), this.total*100, this.stripeId);
  //     this.http.post('https://us-central1-stripe-b30pay.cloudfunctions.net/payWithStripe/charge', {
  //         token: token,
  //         amount: Math.round(this.total * 100),
  //         currency: this.currency.toLowerCase(),
  //         account: this.stripeId
  //       }).subscribe(async (data: any) => {
  //         console.log(data);
  //         if(await data.status === 'succeeded'){
  //           this.loading.dismiss();
  //           this.receipt = data.receipt_url;
  //           this.tx = data.id;
  //           this.presentConfirmSuccess();
  //         } else {
  //           console.log(data.status);
  //           this.loading.dismiss();
  //           this.presentConfirmFail(data.status);
  //         }
  //       }); 
  // }

  chargeCustomer(cardInfo){
    this.presentProcessing();
      console.log(cardInfo);
      try{
        this.http.post('https://us-central1-stripe-b30pay.cloudfunctions.net/payWithStripe/charge', {
          amount: cardInfo.amount,
          currency: this.currency.toLowerCase(),
          source: cardInfo.source,
          account: cardInfo.account,
          fee: 10
        }).subscribe(async (data: any) => {
          console.log(data);
          if(await data.status === 'succeeded'){
            this.loading.dismiss();
            this.receipt = data.receipt_url;
            this.tx = data.id;
            this.presentConfirmSuccess();
          } else {
            console.log(data.status);
            this.loading.dismiss();
            this.presentConfirmFail(data.status);
          }
        }); 
      }catch(e){
        this.loading.dismiss();
        this.presentConfirmFail(e);
      }  
  }

  async scanQR(){
    if (this.platform.is('ios') || this.platform.is('android')){
        this.barcodeScanner.scan({
          showFlipCameraButton : true,
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, 
          formats : "QR_CODE",
          disableSuccessBeep: false
      }).then(barcodeData => {
          if (barcodeData) {
            let details = CryptoJs.enc.Utf8.stringify(CryptoJs.enc.Base64.parse(barcodeData.text));
            details = details.split("/");
            let cardDetails = {
              amount: Math.round(this.total * 100),
              source: details[0],
              account: this.stripeId
            }
            console.log(cardDetails);
            this.confirmCharge(cardDetails);
          }
          console.log('Barcode data', barcodeData);
        }).catch(err => {
            console.log('Error', err);
        });
    } else {
      const addModal = await this.modalCtrl.create({
        component: ScannerComponent,
        componentProps: { }
      });
      addModal.onDidDismiss().then((item: any) => {
        if (item.data) {
          console.log(item.data);
          let details = CryptoJs.enc.Utf8.stringify(CryptoJs.enc.Base64.parse(item.data));
          details = details.split("/");
          let cardDetails = {
            amount: Math.round(this.total * 100),
            source: details[0],
            account: this.stripeId
          }
          console.log(cardDetails);
          this.confirmCharge(cardDetails);
        }
      });
      return await addModal.present();
    }
  } 

  async confirmCharge(cardDetails) {
    let alert = await this.alertCtrl.create({
      header: 'Please Confirm Payment',
      message: `Subtotal: <strong>$${this.subtotal.toFixed(2)}</strong> <br> Fee:..... <strong>$${(this.fee / 100).toFixed(2)}</strong> <br> Tax:..... <strong>$${this.tax.toFixed(2)}</strong> <br> Tip:..... <strong>$${this.tipDisplay.toFixed(2)}</strong> <br>Total:... <strong>$${this.total.toFixed(2)}</strong>`,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Process Payment',
          handler: () => {
            this.chargeCustomer(cardDetails);
          } 
        }
      ]
    });
    return await alert.present();
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

  async presentConfirmFail(error) {
    let alert = await this.alertCtrl.create({
      header: 'Transaction Failed',
      message: error,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
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
      body: `Total: $${this.total}, Purchased: ${this.output}, TxID: ${this.tx}.
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
      txId: this.tx,
      usdTotal: this.total,
      coin: this.coin,
      tip: this.tipDisplay,
      items: this.output
    }; 
    this.reportService.createTransaction(pass);
  }

  async presentProcessing() {
    this.loading = await this.loadingCtrl.create({
      message: 'Processing Transaction...'
    });
    return await this.loading.present();
  }

  addTip() {
    this.tip = true;
  }

  async customTip() {
    let alert = await this.alertCtrl.create({
      header: 'Enter Custon Tip',
      inputs: [
        {
          name: 'tip',
          type: 'number',
          placeholder: 'Enter Your Tip'
        }
      ],
      buttons: [
        {
          text: 'Go Back',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Enter',
          handler: (data) => {
            //this.calculateFee();
            let test = parseFloat(data.tip.toString()).toFixed(2);
            console.log(test)
            this.tipDisplay = parseFloat(test);
            console.log(this.tipDisplay)
            this.total = this.total + this.tipDisplay
            this.hideTip();
          }
        }, 
      ]  
    });
    return await alert.present();
  }

  hideTip() {
    this.tip = false;
  }

  // selectTip(value){
  //   if(this.tipDisplay > 0){
  //     this.total = this.total - this.tipDisplay;
  //   }
  //   console.log(value)
  //   this.tip = false;
  //   let test = parseFloat((value.detail.value)).toFixed(2);
  //   console.log(test)
  //   this.tipDisplay = 0;
  //   this.tipDisplay = parseFloat(test);
  //   console.log(this.tipDisplay)
  //   this.total = this.total + this.tipDisplay
  // }

  calculateFee(){
    this.total = 0;
    this.tipDisplay = 0;
    this.total = this.subtotal + (this.fee / 100);
  }

  selectTip(value: any){
    this.calculateFee();
    let test = parseFloat(value).toFixed(2);
    console.log(test)
    this.tipDisplay = this.subtotal * parseFloat(test);
    console.log(this.tipDisplay)
    this.total = this.total + this.tipDisplay + this.tax
    this.hideTip();
  }

}