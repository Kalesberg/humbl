import { from as observableFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';

// export interface callback{
//   uri: string
//   address: string
//   signature: any
//   callback: any
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  authRedirectProvider = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.getRedirectResult().then((result) => {
      console.log(result);
      if (result.credential) {
        this.router.navigateByUrl('/pos');
      }
    }).catch((error) => {
      alert(error.message);
      console.error(error);
      throw new Error(error);
    });
  }

  getResult(provider: auth.AuthProvider): any {
    return observableFrom(this.afAuth.signInWithRedirect(provider));
  }


  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  googleUser(): Promise<firebase.auth.UserCredential> {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.getResult(provider);
  }

  facebookUser(): Promise<firebase.auth.UserCredential> {
    var provider = new firebase.auth.FacebookAuthProvider();
    return this.getResult(provider);
  }

  appleUser(): Promise<firebase.auth.UserCredential> {
    var provider = new firebase.auth.OAuthProvider('apple.com');
    return this.getResult(provider);
  }


  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/businessProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  // anonymousSignup(): Promise<any>{
  //   return firebase.auth().signInAnonymously()
  //     .then((newUserCredential: firebase.auth.UserCredential) => {
  //     firebase
  //       .firestore()
  //       .doc(`/businessProfile/${newUserCredential.user.uid}`)
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     throw new Error(error);
  //   });;
  // }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }
}


