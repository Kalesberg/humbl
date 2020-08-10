import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';
import 'firebase/firestore';
import { HttpClient } from "@angular/common/http";
import { environment} from "../../environments/environment";

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

  constructor(    
    private router: Router,
    private http: HttpClient,
  ) { }

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


