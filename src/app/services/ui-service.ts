import { Injectable } from "@angular/core";
import { ToastController, LoadingController, ActionSheetController, AlertController, PopoverController, ModalController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: "root"
})

export class UiService {

	public loading: HTMLIonLoadingElement;

	constructor(private loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		private translate : TranslateService,
		public toast: ToastController ) { }

	async displayLoader(message: string) {
		this.loading = await this.loadingCtrl.create({
			message: message
		});
		await this.loading.present();
	}

	async dismissLoader() {
		if(this.loading){
			this.loading.dismiss();
		}
	}

	async displayAlertMsg(message){
		const alert1 = await this.alertCtrl.create({
			message: message,
			buttons: [{ text: this.translate.instant("login.ok"), handler: () => {
			  alert1.dismiss();
			}}]
		  });
		  await alert1.present();
	}
	async presentToast(msg) {
		const toast = await this.toast.create({
		  message: msg,
		  position: 'middle',
		  duration: 1000,
		  color: 'dark',
		});
		toast.present();
	  }

}
