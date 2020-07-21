import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  public frmSetNewPassword;
  public loader;
  isVerified: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  constructor(private afAuth: AngularFireAuth, 
    private fb: FormBuilder, 
    private alertController: AlertController, 
    private route: ActivatedRoute,
    public angularfire: AngularFirestore,
    private http: HttpClient,
    public router: Router,) {
      this.frmSetNewPassword = this.fb.group({
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]]
      });
     }

  ngOnInit() {
    this.isError = false;
    this.isVerified = false;
    this.isLoading = false;
  }

  setPassword(){
    const password = this.frmSetNewPassword.controls['password'].value;
    const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;
    if(!password){
      return this.showAlert("Error",'Password is required.');
    }
    
    if(password && password.length<6){
      return this.showAlert("Error",'Password should be at least 6 characters.');
    }

    if (password !== confirmPassword) {
      return this.showAlert("Error","Password and confirm password must be same required.");
    }
    this.isVerified = false;
    this.isLoading = true;
    const code = this.route.snapshot.queryParams['oobCode'];
    if(code){
      let observable = this.http
                .post(environment.apiUrl + 'changePassword/',
                    {oobCode: code, appType: "merchant", newPassword: password },
                    { headers: { "Content-Type": "application/json" } });
      observable.toPromise().then((resp: any) => {
        if(resp && resp.status){
          this.isVerified = true;
          this.isLoading = false;
        }
        else{
          this.isVerified = false;
          this.isLoading = false;
          if(!resp || (resp && resp.message=="Bad request.")){
            this.showAlert("Error",'Oops! Something went wrong. Try again later.');
          } else {
            this.showAlert("Error",resp.message);
          }
        }      
      }).catch(err => {
        this.isVerified = false;
        this.isLoading = false;
        const errorMessage = FirebaseErrors.Parse(err.code); // check this helper class at the bottom
        this.showAlert("Error",errorMessage);
      });
    }
  }

  async showAlert(title,message) {
    const alert = await this.alertController.create({      
      header: title,
      subHeader: message,
      buttons: [{text: "Ok"}],      
    });
    await alert.present();
  }
}
export class FirebaseErrors {

  static Parse(errorCode: string): string {
    let message: string;

    switch (errorCode) {
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/wrong-password':
        message = 'Invalid login credentials.';
        break;
      case 'auth/network-request-failed':
        message = 'Please check your internet connection';
        break;
      case 'auth/too-many-requests':
        message =
          'We have detected too many requests from your device. Take a break please!';
        break;
      case 'auth/user-disabled':
        message =
          'Your account has been disabled or deleted. Please contact the system administrator.';
        break;
      case 'auth/requires-recent-login':
        message = 'Please login again and try again!';
        break;
      case 'auth/email-already-exists':
        message = 'Email address is already in use by an existing user.';
        break;
      case 'auth/user-not-found':
        message =
          'We could not find user account associated with the email address or phone number.';
        break;
      case 'auth/phone-number-already-exists':
        message = 'The phone number is already in use by an existing user.';
        break;
      case 'auth/invalid-phone-number':
        message = 'The phone number is not a valid phone number!';
        break;
      case 'auth/invalid-email  ':
        message = 'The email address is not a valid email address!';
        break;
      case 'auth/cannot-delete-own-user-account':
        message = 'You cannot delete your own user account.';
        break;
      case 'auth/invalid-action-code':
        message = 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.';
        break;
       default:
        message = 'Oops! Something went wrong. Try again later.';
        break;
    }

    return message;
  }
}
