import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private translate : TranslateService,
    private appHelperService: AppHelperService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
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

  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:', resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      // this.authService.resetPassword(email).then(
      //   async () => {
      //     const alert = await this.alertCtrl.create({
      //       message: this.translate.instant("reset.check_email"),
      //       buttons: [
      //         {
      //           text: this.translate.instant("register.ok"),
      //           role: 'cancel',
      //           handler: () => {
      //             this.router.navigateByUrl('login');
      //           },
      //         },
      //       ],
      //     });
      //     await alert.present();
      //   },
      //   async error => {
      //     const errorAlert = await this.alertCtrl.create({
      //       message: error.message,
      //       buttons: [{ text: this.translate.instant("register.ok"), role: 'cancel' }],
      //     });
      //     await errorAlert.present();
      //   }
      // );
      this.authService.sendPasswordResetLink(email).then(async (resp: any)=>{
        if(resp && resp.status){
          const alert = await this.alertCtrl.create({
          message: this.translate.instant("reset.check"),
          buttons: [
            {
              text: this.translate.instant("login.ok"),
              role: 'cancel',
              handler: () => {
                this.router.navigateByUrl('login');
              },
            },
          ],
        });
        await alert.present();
        }
        else {
          this.displayError(resp.message);
        }
      },(error)=>{
        this.displayError(error.message);
      })
    }
  }
  
  async displayError(message){
    const errorAlert = await this.alertCtrl.create({
          message: message,
          buttons: [{ text: this.translate.instant("login.ok"), role: 'cancel' }],
        });
    await errorAlert.present();
  }
  
}
