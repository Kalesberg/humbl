import { Injectable } from "@angular/core";
import { ToastController, LoadingController, ActionSheetController, AlertController, PopoverController, ModalController } from "@ionic/angular";

@Injectable({
	providedIn: "root"
})

export class UiService {

	public loading: HTMLIonLoadingElement;

	constructor(private loadingCtrl: LoadingController) { }

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




}
