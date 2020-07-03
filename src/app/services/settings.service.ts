import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public currentUser: firebase.User;
  public businessProfile: firebase.firestore.DocumentReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.currentUser = user;
        this.businessProfile = firebase.firestore().doc(`/businessProfile/${user.uid}`);
      }
    });
  }

  getBusinessProfile(): firebase.firestore.DocumentReference {
    return this.businessProfile;
  }
  
  updateLogo(logoUrl: string): Promise<any> {
    return this.businessProfile.update({ logoUrl });
  }

  updateName(businessName: string): Promise<any> {
    return this.businessProfile.update({ businessName });
  }

  updateBusinessEmail(businessEmail: string): Promise<any> {
    return this.businessProfile.update({ businessEmail });
  }

  updateBusinessAddress(businessAddress: string): Promise<any> {
    return this.businessProfile.update({ businessAddress });
  }

  updateCoordinates(coordinates: string): Promise<any> {
    return this.businessProfile.update({ coordinates });
  }

  updateCurrency(currency: string): Promise<any> {
    return this.businessProfile.update({ currency });
  }

  updateStripeId(stripeId: string): Promise<any> {
    return this.businessProfile.update({ stripeId });
  }

  updateMessageToken(messageToken: any): Promise<any> {
    console.log(messageToken)
    return this.businessProfile.update({ messageToken });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
  
    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.businessProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
  
    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
