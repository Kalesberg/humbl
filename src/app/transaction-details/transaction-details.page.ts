import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {

  public userProfile: any;

  constructor(private navController: NavController, public settingsService: SettingsService) { }

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

  gotoTransactionSummary(){
    this.navController.navigateForward('merchant/transaction-summary')
  }

}
