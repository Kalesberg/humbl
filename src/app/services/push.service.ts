import { Injectable } from '@angular/core';
import { AlertController  } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging';
import 'firebase/messaging';
import { SettingsService } from './settings.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  public currentUser: firebase.User;
  public businessProfile: firebase.firestore.DocumentReference;

  constructor(private messaging: AngularFireMessaging,
    private alertCtrl: AlertController,
    public settingsService: SettingsService) {
      firebase.auth().onAuthStateChanged(user => {
        if (user && user.uid) {
          this.currentUser = user;
          this.businessProfile = firebase.firestore().doc(`/businessProfile/${user.uid}`);
        }
      });
  }

  requestPermission() {
      this.messaging.requestToken.subscribe(
        token => {
          console.log(token)
          this.updateMessageToken(token);
        },
        err => {
          console.error('Unable to get permission to notify.', err);
        }
      );
  }

  receiveMessage() {
    this.messaging.onMessage(async (payload) => {
      console.log('Message received. ', payload);
      let alert = await this.alertCtrl.create({
        subHeader: payload.notification.title,
        message: payload.notification.body,
        buttons: ['OK']
      });
      await alert.present();
    });
    this.messaging.messages.subscribe((payload: any) => {
      console.log('new message received. ', payload);
      alert(payload);
    });
  }

  updateMessageToken(messageToken: any): Promise<any> {
    console.log(messageToken)
    return this.businessProfile.update({ messageToken });
  }
}
