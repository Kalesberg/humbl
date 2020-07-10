import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { SettingsService } from '../services/settings.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor( public toast: ToastController, private alertCtrl: AlertController,
    public settingsService: SettingsService,
    private translate : TranslateService) { }

  ngOnInit() {
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant("account.change"),
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: this.translate.instant("account.new") },
        { name: 'password', placeholder: this.translate.instant("account.enter"), type: 'password' },
      ],
      buttons: [
        { text: this.translate.instant("items.cancel") },
        {
          text: this.translate.instant("settings.save"),
          handler: data => {
            this.settingsService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                this.presentToast();
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }
  
  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant("account.update"),
      inputs: [
        { name: 'oldPassword', placeholder: this.translate.instant("account.oldpass"), type: 'password' },
        { name: 'newPassword', placeholder: this.translate.instant("account.newpass"), type: 'password' },
      ],
      buttons: [
        { text: this.translate.instant("items.cancel") },
        {
          text: this.translate.instant("settings.save"),
          handler: data => {
            this.settingsService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
            this.presentToast();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: this.translate.instant("settings.saved"),
      position: 'middle',
      duration: 1000,
      color: 'dark',
    });
    toast.present();
  }

}
