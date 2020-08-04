import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/settings.service'
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private translate : TranslateService,
    private appHelperService: AppHelperService
  ) {
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      passwordCheck: [
        null,
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
    console.log(this.signupForm);
  }

  ngOnInit() {
    this.appHelperService.hideMenu();
  }

  ionViewWillEnter() {    
    this.appHelperService.hideMenu();
  }

  ionViewWillLeave() {
    this.appHelperService.showMenu();
  } 

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
  
      this.authService.signupUser(email, password).then(
        (res) => {
          this.loading.dismiss().then(() => {
            this.settingsService.updateSignupemail(res.user.uid,email);
            this.authService.sendEmailVerificationLink(email, true);// SendVerificationMail()
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: this.translate.instant("register.ok"), role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create({});
      await this.loading.present();
    }
  }

}
