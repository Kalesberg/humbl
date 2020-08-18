import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-scan-and-pay',
  templateUrl: './scan-and-pay.page.html',
  styleUrls: ['./scan-and-pay.page.scss'],
})
export class ScanAndPayPage implements OnInit {

  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string ="test qrdata";
  public userProfile: any;

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.settingsService
        .getBusinessProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
        });
      }
    });
  }

}
