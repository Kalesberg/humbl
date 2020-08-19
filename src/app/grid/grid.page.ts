import { Component, OnInit } from '@angular/core';
import { AppHelperService } from '../services/app-helper.service';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {

  public userProfile: any;
  
  constructor(private appHelperService: AppHelperService,public settingsService: SettingsService) { }

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
