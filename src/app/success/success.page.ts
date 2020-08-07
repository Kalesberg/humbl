import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router"; 
import { SettingsService } from '../services/settings.service';
import { CryptoService } from '../services/crypto.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage {

  public name: any = null;
  public id: string = null;
  public waiting: boolean = true;
  public success: boolean;
  public loading: any;

  constructor(private route: ActivatedRoute,
    private settingsService: SettingsService,
    private crypto: CryptoService,
    public loadingCtrl: LoadingController,
    public router: Router,
    private translate : TranslateService) {
  
  }

  ionViewWillEnter() {
    this.load();
    setTimeout(()=>{
      this.route.queryParams.subscribe((params: any) => {
        console.log(params)
        if(params.code){
          this.sendToStripe(params.code);
        } else{
          this.loading.dismiss();
          this.success = false;
        }
      });
    }, 1200);  
  }

  sendToStripe(code: string){
    try{
      this.crypto.getStripeAuth(code).subscribe((res: any)=> {
        if(res.stripe_user_id){
          this.success = true;
          this.loading.dismiss();
          this.settingsService.updateStripeId(res.stripe_user_id);
        } else {
          this.success = false;
          this.loading.dismiss();
        }
      });
    }catch(e){
      this.success = false;
      this.loading.dismiss();
    }
  }

  async load(){
    this.loading = await this.loadingCtrl.create();
      await this.loading.present();
  }

  close(){
    this.router.navigateByUrl('/merchant/settings');
  }

}
