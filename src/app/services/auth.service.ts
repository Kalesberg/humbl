import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';
import 'firebase/firestore';
import { HttpClient } from "@angular/common/http";
import { environment} from "../../environments/environment";
const { SplashScreen } = Plugins;

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

  constructor ( 
    private router: Router,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private platform: Platform
  ) {
    if (!this.platform.is("capacitor")) {
      this.afAuth.getRedirectResult().then(async (result) => {
          this.afAuth.onAuthStateChanged((userData) => {
            if (userData && userData.uid) {
            this.router.navigateByUrl('/pos');
            } else {
              if (SplashScreen) {
                SplashScreen.hide();
              }
              this.router.navigateByUrl('/home');
            }
          });
      }).catch((error) => {
        alert(error.message);
        console.error(error);
        throw new Error(error);
      });
    }
  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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

  SendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
        firebase.auth().signOut();
        this.router.navigateByUrl('/verify_email');
      });
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }

  sendEmailVerificationLink(email, isNavigate) {
    let observable = this.http
                .post(environment.apiUrl + 'sendEmailVerificationLink/',
                    {email: email,appType: "merchant" },
                    { headers: { "Content-Type": "application/json" } });
    observable.toPromise().then(() => {
    if(isNavigate)
      this.router.navigateByUrl('/verify_email');
    });
  }

  sendPasswordResetLink(email) {
    let observable = this.http
      .post(environment.apiUrl + 'sendPasswordResetLink/',
        {email: email,appType: "merchant" },
        { headers: { "Content-Type": "application/json" } });

    return observable.toPromise();
  }

}  


