import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController, IonSegment } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //public jwt: string = null;
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  public emailPass: boolean = false;
  @ViewChild('typesegment') typesegment:any;

  constructor(private authService: AuthService, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router,
    private formBuilder: FormBuilder,
    private translate : TranslateService,
    private appHelperService: AppHelperService) { 
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

  ngOnInit() {
    this.appHelperService.hideMenu();
  }

  ionViewWillEnter() {    
    this.appHelperService.hideMenu();
    if(this.typesegment)
      this.typesegment.value = "merchant";
  }

  ionViewWillLeave() {
    this.appHelperService.showMenu();
  } 

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create({});
      await this.loading.present();
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        (user) => {
          console.log(user);
          this.loading.dismiss().then(async () => {
            if(user.user.emailVerified) {
              this.router.navigateByUrl('/pos');
            } else {
              const alert = await this.alertCtrl.create({
                message: this.translate.instant("login.verify"),
                buttons: 
                  [
                    { text: this.translate.instant("login.resend"), handler: () => {
                      user.user.sendEmailVerification().then(async () => {
                        const alert1 = await this.alertCtrl.create({
                          message: this.translate.instant("login.sent"),
                          buttons: [{ text: this.translate.instant("login.ok"), handler: () => {
                            alert1.dismiss();
                          }}]
                        });
                        await alert1.present();
                      });
                    }},
                    { text: this.translate.instant("login.ok"), handler: () => {
                      alert.dismiss();                      
                    }}
                  ],
              });
              await alert.present();
            }
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
    }
  }

  chooseEmail(){
    this.emailPass = true;
  }
}
