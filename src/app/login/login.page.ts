import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../services/ui-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //public jwt: string = null;
  public loginForm: FormGroup;
  public emailPass: boolean = false;
  @ViewChild('typesegment') typesegment:any;

  constructor(private authService: AuthService, 
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private translate : TranslateService,
    private uiService: UiService) { 
    //this.jwt = this.authService.digiQR().toString();
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    if(this.typesegment)
      this.typesegment.value = "merchant";
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {;
      await this.uiService.displayLoader("");
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        async (user) => {
            if(user.user.emailVerified) {
              this.authService.authCheckAndRedirect();
            } else {
              this.uiService.dismissLoader();
              const alert = await this.alertCtrl.create({
                message: this.translate.instant("login.verify"),
                buttons: 
                  [
                    { text: this.translate.instant("login.resend"), handler: () => {
                      this.uiService.displayLoader("")
                      this.authService.sendEmailVerificationLink(email, false, true);
                    }},
                    { text: this.translate.instant("login.ok"), handler: () => {
                      alert.dismiss();                      
                    }}
                  ],
              });
              await alert.present();
            }
        }, async (error) => {
          this.uiService.dismissLoader();
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: this.translate.instant("register.ok"), role: 'cancel' }],
            });
            await alert.present();
        });
    }
  }

  chooseEmail(){
    this.emailPass = true;
  }
}
