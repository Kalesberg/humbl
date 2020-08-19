import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  public userData;
  constructor(
    public authService: AuthService,
    private router: Router,
    private storage: Storage, 
    public translate: TranslateService
  ) {
  }

  ngOnInit() {}

  ionViewWillEnter(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // let firstname, lastname, username;
        this.userData = user;
        console.log(this.userData)
        // this.storage.forEach((value, key) => {
        //   if(key === 'firstname'){
        //     firstname = value;
        //   } else if (key === 'lastname'){
        //     lastname = value;
        //   } else if (key === 'username'){
        //     username = value;
        //   }
        // }).then(() => {
        //   firebase.firestore().doc(`/userProfile/${this.userData.uid}`).set({firstname, lastname, username, email: user.email}).then(() => {
        //     this.storage.remove('firstname');
        //     this.storage.remove('lastname');
        //     this.storage.remove('username');
        //   });
        // })
      }
    });
  }

  ionViewWillLeave() {
    this.authService.logoutUser();
  }
}
