import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-text-order-details',
  templateUrl: './text-order-details.page.html',
  styleUrls: ['./text-order-details.page.scss'],
})
export class TextOrderDetailsPage implements OnInit {

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
  orderChat(){
    this.navController.navigateForward('merchant/text-order')
  }
}
