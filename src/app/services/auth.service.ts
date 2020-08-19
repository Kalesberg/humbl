import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';
import 'firebase/firestore';
import { HttpClient } from "@angular/common/http";
import { environment} from "../../environments/environment";
import { UiService } from './ui-service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AppHelperService } from './app-helper.service';
import { Storage } from '@ionic/storage';
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

  constructor(    
    private router: Router,
    private http: HttpClient,
    private uiService: UiService,
    private translate : TranslateService,
    private settingsService: SettingsService, 
    private navController: NavController,
    private appHelperService: AppHelperService,
    private storage: Storage
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

  sendEmailVerificationLink(email: string, isNavigate: boolean, isAlert: boolean=false) {
    let observable = this.http
                .post(environment.apiUrl + 'sendEmailVerificationLink/',
                    {email: email,appType: "merchant" },
                    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    observable.toPromise().then(async () => {
      this.uiService.dismissLoader();
      if(isNavigate){
        this.router.navigateByUrl('/verify_email');
      }
      else if(isAlert) {
        this.uiService.displayAlertMsg(this.translate.instant("login.sent"));
      }
    }).catch((err)=>{
      this.uiService.dismissLoader();
      console.error(err);
    });
  }

  sendPasswordResetLink(email) {
    let observable = this.http
      .post(environment.apiUrl + 'sendPasswordResetLink/',
        {email: email,appType: "merchant" },
        { headers: { "Content-Type": "application/json" } });

    return observable.toPromise();
  }

  authCheckAndRedirect(isLogin: boolean = false){
    let url = "/home";
      firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
        if (user && user.uid && user.emailVerified) {
          let userData = await this.settingsService.getUserProfile(user.uid).get();
          if(userData && userData.data()){
            // if(userData.data().isAgent){
            //   if(isLogin)
            //     url= "/agent-terms";
            //   else
            //     url= "/agents";
            // }
            // else {
              url= "/grid";
            // }
            this.appHelperService.currentUser$.next(userData.data());
            await this.storage.set('humble_user', userData.data());
          }
        }
        else if(user && !user.emailVerified){
          await firebase.auth().signOut();
        }
        if (SplashScreen) {
          SplashScreen.hide();
        }
        this.uiService.dismissLoader();
        this.appHelperService.activeUrl = url;
        this.navController.navigateRoot(url);
    });
  }

}  


