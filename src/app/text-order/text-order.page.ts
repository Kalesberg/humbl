import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-text-order',
  templateUrl: './text-order.page.html',
  styleUrls: ['./text-order.page.scss'],
})
export class TextOrderPage implements OnInit {
  
  public userProfile: any;

  constructor(private navController: NavController, public settingsService: SettingsService) { }

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

  sendLink() {
    // this.navController.navigateForward('merchant/chat')
  }
}
