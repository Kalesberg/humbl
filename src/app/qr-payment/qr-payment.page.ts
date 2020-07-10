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
  public totalAmount: number =0;
  public logoImageURL: string ="";

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
          this.getProfile();
          resolve(this.user);
        } else {
          this.user = false;
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
      let userProfile = userProfileSnapshot.data();
      if(userProfile) {
        let username = userProfile.email;
        this.qrData = "merchant-" + CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(username))+"?amount="+this.totalAmount.toFixed(2);
        this.logoImageURL = userProfile.logoUrl? userProfile.logoUrl : '../../assets/avatar.png';
      }
    });
  }

}
