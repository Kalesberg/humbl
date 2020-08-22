import { Component } from '@angular/core';
import { Platform, NavController, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ReportService } from '../services/report.service';
import { Storage } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { SettingsService } from '../services/settings.service';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {ScannerComponent} from '../scanner/scanner.component';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { TranslateService } from '@ngx-translate/core';
const { Filesystem } = Plugins;

@Component({
  selector: 'app-items',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  single: any[];
  //view: any[] = [300, 300];
  showLegend = true;
  legendPosition = 'below';
  legendTitle = 'Coin Variance';

  colorScheme = {
    domain: ['#ffffff', '#ffd31a']
  };

  showLabels = true;
  explodeSlices = false;
  doughnut = true;
  public transactions: any;
  public extTransactions: any;
  public searchTerm: any = '';
  public sum: number = 0.00;
  public dgbSum: number = 0.00;
  public ltcSum: number = 0.00;
  public btcSum: number = 0.00;
  public xlmSum: number = 0.00;
  public daiSum: number = 0.00;
  public cashSum: number = 0.00;
  public cardSum: number = 0.00;
  public extSum: number = 0.00;
  public canEmail: boolean = false;
  public businessEmail: string;
  public userProfile: any;
  public externalAddress: any = null;
  public externalLTCAddress: any;
  public externalBTCAddress: any;
  public externalXLMAddress: any;
  public externalDAIAddress: any;
  public transactionList: Observable<any>;
  public extTransactionList: Observable<any>; 
  public userId: string;
  public dgbBalance: number = 0;
  public ltcBalance: number = 0;
  public btcBalance: number = 0;
  public xlmBalance: number = 0;
  public daiBalance: number = 0;
  public dgbPrice: number = 0;
  public xlmPrice: number = 0;
  public ltcPrice: number = 0;
  public btcPrice: number = 0;
  public daiPrice: number = 0;
  public searching: boolean = true;
  public currentUser: any;
  public stripeId: string;
  public showExts: boolean = false;
  public tipsSum: number = 0;
  public scanTipsSum: number = 0;
  public allTransactions: any = [];
  public loading: any;
  constructor(public storage: Storage, public reportService: ReportService, 
    public navCtrl: NavController, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public toast: ToastController, 
    public emailComposer: EmailComposer, public platform: Platform, 
    public cryptoService: CryptoService, private settingsService: SettingsService, 
    private changeRef: ChangeDetectorRef, public crypto: CryptoService,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    private translate : TranslateService) { 
  
  }

  ionViewWillEnter() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
      }
      this.settingsService
        .getBusinessProfile(user.uid)
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.businessEmail = this.userProfile.businessEmail;
          this.externalAddress = this.userProfile.digibyteAddress;
          this.stripeId = this.userProfile.stripeId; 
          this.getTransactions();
          this.getExtTransactions();
      });  
    });    
  }

  ionViewDidLoad(){
    this.setFilteredItems();
  }

  getTransactions() {
    console.log(this.currentUser)
    this.transactions = [];
    firebase.firestore().collection(`transactions/${this.currentUser}/txList`).orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
              this.transactions.push(doc.data());
              this.calculateSales();
              this.calculateTerminalTips();
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }

  getExtTransactions() {
    this.extTransactions = [];
      firebase.firestore().collection(`exttransactions/${this.stripeId}/txList`).orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
              this.extTransactions.push(doc.data());
              this.calculateScans();
              this.calculateScanTips();
              console.log(this.scanTipsSum)
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }

  viewExtTransactions(){
    this.showExts = true;
    this.calculateScans();
    this.calculateScanTips();
  }  

  hideExtTransactions(){
    this.showExts = false;
  }  

  async scanExtQR(){
    if(this.platform.is('ios') || this.platform.is('android')){
      this.barcodeScanner.scan({
        showFlipCameraButton : true,
        prompt : this.translate.instant("reports.prompt"), // Android
        resultDisplayDuration: 500, 
        formats : "QR_CODE",
        disableSuccessBeep: false
    }).then(barcodeData => {
        if (barcodeData) {
          this.searchTerm = barcodeData.text;
        } else {
          this.searchTerm = '';
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
          this.searchTerm = item.data;
          this.setExtFilteredItems();
        } else {
          this.searchTerm = '';
          this.setExtFilteredItems();
        }
      });
      return await addModal.present();
   }
  } 

  async scanQR(){
    if(this.platform.is('ios') || this.platform.is('android')){
      this.barcodeScanner.scan({
        showFlipCameraButton : true,
        prompt :this.translate.instant("reports.prompt"), // Android
        resultDisplayDuration: 500, 
        formats : "QR_CODE",
        disableSuccessBeep: false
    }).then(barcodeData => {
        if (barcodeData) {
          this.searchTerm = barcodeData.text;
        } else {
          this.searchTerm = '';
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
          this.searchTerm = item.data;
          this.setFilteredItems();
        } else {
          this.searchTerm = '';
          this.setFilteredItems();
        }
      });
      return await addModal.present();
   }
  } 

  filterCoins(searchTerm){
    return this.transactions.filter((transaction) => {
        return transaction.coin.indexOf(searchTerm) > -1;
    });    
  }

  calculateSales() {
    this.sum = this.transactions.reduce((total, transaction) => {
    return total + transaction.usdTotal;
    }, 0);
  }

  calculateScans(){
    this.extSum = this.extTransactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.usdTotal);
      }, 0);
  }

  calculateScanTips(){
    this.scanTipsSum = this.extTransactions.reduce((total, transaction) => {
        if(isNaN(parseFloat(transaction.tip))){
          return total + 0;
        }else{
          return total + parseFloat(transaction.tip);
        }
      }, 0);
  }

  calculateTerminalTips(){
    this.tipsSum = this.transactions.reduce((total, transaction) => {
      if(isNaN(parseFloat(transaction.tip))){
        return total + 0;
      }else{
        return total + parseFloat(transaction.tip);
      }
    }, 0);
  }

  csvData(){
    this.presentLoader();
    let temp: any = this.transactions.concat(this.extTransactions);
    console.log(temp)
    temp.forEach((tx: any)=>{
      console.log(tx)
      if(tx.date && tx.txId && tx.usdTotal)
      this.allTransactions.push({
        date: new Date(tx.date.seconds * 1000).toDateString(),
        txId: `https://dashboard.stripe.com/payments/${tx.txId}`,
        tip: tx.tip || 0,
        total: parseFloat(tx.usdTotal).toFixed(2)
      });
    })
  }
  
  convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
  }

  async downloadCSV() {
    this.csvData();
    setTimeout(()=>{
      let data, filename, link;
      let csv = this.convertArrayOfObjectsToCSV({
          data: this.allTransactions
      });
      if (csv === null) return;
      filename = 'HUMBL-Export.csv';

      if(this.platform.is('ios') || this.platform.is('android')) {
        this.testEmail(filename, csv);
      } else {
        this.loading.dismiss();
        console.log(this.allTransactions);
        if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
      }
    }, 2000);   
  }  

  testEmail(filename, data) {
    try {
      Filesystem.writeFile({
        path: filename,
        data: data,
        encoding: FilesystemEncoding.ASCII,
        directory: FilesystemDirectory.Documents,
      }).then((res) =>{
        Filesystem.getUri({
          directory: FilesystemDirectory.Documents,
          path: filename
        }).then(result => {
          console.log("URI:", result);
          let email = {
            to: this.businessEmail,
            attachments: [result.uri],
            subject: this.translate.instant("reports.email_subject"),
            body: this.translate.instant("reports.email_body"),
            isHtml: true
          };
          console.log(res);
          this.emailComposer.open(email);
        });
      });
    } catch(e) {
      console.error('Unable to write file', e);
    }
  }

  sendEmail(email: string, subj: string, body: string) {
    location.href = `mailto:${email}?subject=${subj}&body=${body}`;
  }

  async setFilteredItems() {
    if(!this.searchTerm){
      this.getList();
    } else {
      this.transactions = await this.filterItems(this.searchTerm);
      this.changeRef.detectChanges();
      this.calculateSales();
    }
  }

  async setExtFilteredItems() {
    if(!this.searchTerm){
      this.getList();
    } else {
      this.extTransactions = await this.filterExtItems(this.searchTerm);
      this.changeRef.detectChanges();
      this.calculateScans();
    }
  }

  onSearchInput(){
    this.changeRef.detectChanges();
  }

  filterItems(searchTerm){
    return this.transactions.filter((item) => {
        return item.txId.indexOf(searchTerm) > -1;
    });    
  }

  filterExtItems(searchTerm){
    return this.extTransactions.filter((item) => {
        return item.txId.indexOf(searchTerm) > -1;
    });    
  }

  getList(){
    this.settingsService
      .getBusinessProfile(this.currentUser)
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.businessEmail = this.userProfile.businessEmail;
        this.stripeId = this.userProfile.stripeId;
        this.getTransactions();
        this.getExtTransactions();
        this.calculateSales();
        this.calculateScans();
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

  async presentConfirmFail(error) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("reports.refund_fail"),
      message: error,
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

  async presentLoader() {
    this.loading = await this.loadingCtrl.create({
      message: this.translate.instant("reports.create")
    });
    return await this.loading.present();
  }

  toStripe(){
    location.href = 'https://dashboard.stripe.com/dashboard';
  }

}
