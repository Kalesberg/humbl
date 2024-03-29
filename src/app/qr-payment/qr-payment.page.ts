import { ActivatedRoute } from '@angular/router';
import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-qr-payment',
  templateUrl: './qr-payment.page.html',
  styleUrls: ['./qr-payment.page.scss'],
})
export class QrPaymentPage implements OnInit {

  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string;
  public user: boolean = false;
  public totalAmount = 0;
  public logoImageURL = '';
  public userProfile: any;

  constructor(private settingsService: SettingsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let totalamt = this.route.snapshot.paramMap.get('totalamount');
    this.totalAmount = totalamt? Number(totalamt):0;
  }

  ionViewWillEnter(){
    this.authCheck();
  }

  authCheck(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.user = true;
          this.getProfile(user);
          resolve(this.user);
        } else {
          this.user = false;
          resolve(this.user);
        }
      });
    });
  }

  getProfile(user: any){
    this.settingsService
    .getBusinessProfile(user.uid)
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();      
      if(this.userProfile) {
        let username = this.userProfile.email;
        this.qrData = "merchant:" + CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(username))+"?amount="+this.totalAmount.toFixed(2);
        this.logoImageURL = this.userProfile.logoUrl? this.userProfile.logoUrl : '../../assets/avatar.png';
      }
    });
  }

}
