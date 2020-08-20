import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { SettingsService } from '../services/settings.service';
import * as CryptoJs from 'crypto-js';
import { Storage } from '@ionic/storage';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { SelectOptionsComponent } from '../components/select-options/select-options.component';
import { AppHelperService } from '../services/app-helper.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UiService } from '../services/ui-service';
import { TranslateService } from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.page.html',
  styleUrls: ['./merchant-profile.page.scss'],
})
export class MerchantProfilePage implements OnInit {

  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string;
  public userProfile: any = null;
  public businessName: string = null;
  public businessEmail: string = null;
  public username: string = null;
  public currency: string = 'USD';
  public currencyName: string = 'USD';
  public selectedCurrency: any ;
  public currentUser: any;
  public stripeId: string;
  public downloadURL: any;
  public imageURL: any;
  public uploadPercent: any;
  public logo: string;
  public businessAddress: string;
  public coordinates: any;
  public taxRate: number = null;
  public optionalTax: boolean;
  public stripe:string="Stripe";
  public isModel: boolean= false;
  
  constructor(private settingsService: SettingsService,
    public storage: Storage, private modalCtrl: ModalController,
    public appHelperService: AppHelperService, public navCtrl: NavController,
    private afStorage: AngularFireStorage, private uiService: UiService,
    private translate : TranslateService, public alertCtrl: AlertController,
    public crypto: CryptoService,) { 
    this.storage.get('myTax').then((data) => {
      this.taxRate = data;
    });

  this.storage.get('myOptionalTax').then((data) => {
      this.optionalTax = !data ? false : data;
    });
  }

  ngOnInit() {
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
        this.selectedCurrency = this.appHelperService.currencyOptions.filter((d)=> {return d.id == this.currency})[0];
        this.currencyName = this.selectedCurrency.name;
        console.log(this.stripeId)
        if(!this.currency){
          this.currency = 'USD';
          this.saveCurrency();
        }
        this.imageURL = this.userProfile.logoUrl;
        if(!this.imageURL){
          this.imageURL = `../../assets/avatar.png`;
        }
        this.qrData = "merchant:" + CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(this.username));
        this.businessName = this.userProfile.businessName;
        this.businessAddress = this.userProfile.businessAddress;
        this.businessEmail = this.userProfile.businessEmail;
        this.coordinates = this.userProfile.coordinates;
      });
    });
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

  async selectCurrency() {
    if(!this.isModel){
      let modal = await this.modalCtrl.create({
        component: SelectOptionsComponent,
        componentProps:{options : this.appHelperService.currencyOptions, title:"Currency Selection", seletedItem: this.selectedCurrency }
      })

      modal.present();
      let resp = await modal.onDidDismiss();
      if(resp.role=="change"){
        this.currency = resp.data.id;
        this.selectedCurrency = resp.data;
        this.currencyName = this.selectedCurrency.name;
      }

    }
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
      this.uiService.presentToast(this.translate.instant("settings.saved"));
    });
  }

  async saveProfile() {
    if(!this.businessName)
      return this.uiService.displayAlertMsg("Enter Business Name");
    if(!this.businessEmail)
      return this.uiService.displayAlertMsg("Enter Business Email");
    if(this.businessAddress && this.businessAddress.includes('#')){
      return this.addressAlert();
    }

    try {

      this.uiService.displayLoader("");
      let locResp: any = this.businessAddress? await this.crypto.getCoordinates(this.businessAddress): "";
      let businessData= {
        businessName: this.businessName,
        businessEmail: this.businessEmail,
        businessAddress: this.businessAddress,
        currency: this.currency,
        coordinates: locResp.results[0].geometry? locResp.results[0].geometry.location : null
      }
      await this.settingsService.updateBusinessProfile(businessData);
      this.uiService.dismissLoader();
      this.uiService.displayAlertMsg("Profile saved successfully");
    } catch (error) {
      console.error(error);
      let errorMsg = error && error.message? error.message : "Something wents wrong for saving profile please try again.";
      this.uiService.dismissLoader();
      this.uiService.displayAlertMsg(errorMsg);
    }
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
  checkFormValid() {
    if(this.stripeId && this.businessName && this.businessEmail)
      return false;
    return true;
  }

  toggleStripe() {
    if(this.stripeId){
      this.disconnectStripe();
    }
    else {
      this.stripeConnect();
    }
  }

  stripeConnect() {
    location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${environment.stripe_client}&scope=read_write`;
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
            this.uiService.presentToast(this.translate.instant("settings.saved"));
          },
        },
      ],
    });
    await alert.present();
  }

}
