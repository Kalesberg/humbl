import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

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
