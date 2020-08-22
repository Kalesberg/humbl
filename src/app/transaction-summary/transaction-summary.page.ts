import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.page.html',
  styleUrls: ['./transaction-summary.page.scss'],
})
export class TransactionSummaryPage implements OnInit {
  
  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string ="test qrdata"
  public userProfile: any;

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.settingsService
        .getBusinessProfile(user.uid)
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
        });
      }
    });
  }

}
