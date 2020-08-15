import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/settings.service'
import { UiService } from '../services/ui-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  public signupForm: FormGroup;
  public loading: any;
  @ViewChild('typesegment') typesegment:any;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private translate : TranslateService,
    private uiService: UiService
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
  }

  ngOnInit() { }

  ionViewWillEnter() {
    if(this.typesegment)
      this.typesegment.value = "merchant";
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      this.uiService.displayLoader("");
  
      this.authService.signupUser(email, password).then(
        async (res) => {
            let isAgent = (this.typesegment.value === "agent");
            await this.settingsService.addBusinessProfile(res.user.uid, email);
            await this.settingsService.addUserProfile(res.user.uid, email, isAgent);
            this.authService.sendEmailVerificationLink(email, true, false);
        }, async (error) => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: this.translate.instant("register.ok"), role: 'cancel' }],
            });
            this.uiService.dismissLoader();
            await alert.present();
        }
      );
    }
  }

}
