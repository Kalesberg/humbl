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
  public userProfile: firebase.firestore.DocumentReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.uid) {
        this.currentUser = user;
        this.businessProfile = firebase.firestore().doc(`/businessProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(uid): firebase.firestore.DocumentReference {
    this.userProfile = firebase.firestore().doc(`/userProfile/${uid}`);
    return this.userProfile;
  }

  getBusinessProfile(uid): firebase.firestore.DocumentReference {
    this.userProfile = firebase.firestore().doc(`/businessProfile/${uid}`);
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

  updateSignupemail(userId, email){
    return firebase.firestore().doc(`/businessProfile/${userId}`).set({ email: email }, { merge: true });
  }

  addBusinessProfile(userId: string , email: string ) {
    return firebase.firestore().collection('businessProfile').doc(userId).set({ email: email }, { merge: true });
  }

  addUserProfile(userId, email, isAgent){
    return firebase.firestore().collection('userProfile').doc(userId).set({ email: email, isAgent: isAgent }, { merge: true });
  }

  updateBusinessProfile(businessData: any ): Promise<any> {
    return this.businessProfile.update(businessData);
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
