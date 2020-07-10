import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';
import { ReportService } from '../services/report.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { CryptoService } from '../services/crypto.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tx-detail',
  templateUrl: './tx-detail.page.html',
  styleUrls: ['./tx-detail.page.scss'],
})
export class TxDetailPage implements OnInit {
  public id: any = '';
  public uid: any = '';
  public currentUser: any = '';
  public userProfile: any = '';
  public stripeId: string = '';
  public transaction: any = '';
  public tx: any = '';
  public loading: any;
  public ext: string;
  constructor(private route: ActivatedRoute,
    public settingsService: SettingsService,
    public reportService: ReportService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public crypto: CryptoService,
    private translate : TranslateService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.ext = this.route.snapshot.paramMap.get('ext');
    console.log(this.ext)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
      }
      this.settingsService
        .getBusinessProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.stripeId = this.userProfile.stripeId;
          this.getTransaction(); 
      });  
    });    
  }

  getTransaction(){
    if(this.ext === 'true'){
      firebase.firestore().collection(`exttransactions/${this.stripeId}/txList`).where("txId", "==", this.id)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
              this.transaction = doc.data();
              console.log(this.transaction)
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    } else {
      firebase.firestore().collection(`transactions/${this.currentUser}/txList`).where("txId", "==", this.id)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
              this.transaction = doc.data();
              console.log(this.transaction)
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }
  }

  async confirmRefund() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("txdetail.refund_header"),
      message: this.translate.instant("txdetail.sure"),
      buttons: [
        {
          text: this.translate.instant("txdetail.dismiss"),
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
          }
        },
        {
          text: this.translate.instant("txdetail.refund"),
          cssClass: 'primary',
          handler: () => {
            this.issueRefund();
          }
        },
      ]
    });
    return await alert.present();
  }

  issueRefund(){
    this.presentProcessing();
    if(this.ext === 'true'){
      this.crypto.refundCharge(this.transaction.usdTotal, this.stripeId, this.id).subscribe((data: any) => {
        if(data.status === 'succeeded'){
          this.loading.dismiss();
          this.presentConfirmSuccess();
          this.reportService.removeExtTx(this.stripeId, this.transaction.id);
          this.router.navigateByUrl('/reports');
        } else {
          this.loading.dismiss();
          this.presentConfirmFail(data.status);
        }
      }); 
    } else{
      this.crypto.refundCharge(this.transaction.usdTotal, this.stripeId, this.id).subscribe((data: any) => {
        if(data.status === 'succeeded'){
          this.loading.dismiss();
          this.presentConfirmSuccess();
          this.reportService.removeTx(this.currentUser, this.transaction.id);
          this.router.navigateByUrl('/reports');
        } else {
          this.loading.dismiss();
          this.presentConfirmFail(data.status);
        }
      }); 
    }
  }

  async presentConfirmSuccess() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("reports.refund_success"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl('/reports');
          }
        }
      ]
    });
    return await alert.present();
  }

  async presentConfirmFail(error) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("reports.refund_fail"),
      message: error,
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl('/reports');
          }
        }
      ]  
    });
    return await alert.present();
  }

  async presentProcessing() {
    this.loading = await this.loadingCtrl.create({
      message: this.translate.instant("reports.refund_process")
    });
    return await this.loading.present();
  }

  async confirmDelete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("txdeail.record"),
      message: this.translate.instant("txdeail.sure"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
          }
        },
        {
          text: this.translate.instant("items.delete"),
          cssClass: 'primary',
          handler: () => {
            if(this.ext === 'true'){
              console.log(this.transaction.id)
              this.reportService.removeExtTx(this.stripeId, this.transaction.id);
              this.router.navigateByUrl('/reports');
            } else{
              console.log(this.transaction.id)
              this.reportService.removeTx(this.currentUser, this.transaction.id);
              this.router.navigateByUrl('/reports');
            }
          },
        }
      ]
    });
    return await alert.present();
  }

  async confirmExtDelete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("txdeail.record"),
      message: this.translate.instant("txdeail.sure"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
          }
        },
        {
          text: this.translate.instant("items.delete"),
          cssClass: 'primary',
          handler: () => {
            this.reportService.removeExtTx(this.stripeId, this.transaction.txId);
            this.router.navigateByUrl('/reports');
          }
        },
      ]
    });
    return await alert.present();
  }

}
