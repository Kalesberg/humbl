import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-bill-pay',
  templateUrl: './bill-pay.page.html',
  styleUrls: ['./bill-pay.page.scss'],
})
export class BillPayPage implements OnInit {

  public people = [
    {
      name: 'Raul M.',
      location: 'Mexico City, MX',
      id: '@RaulSurf78'

    }
  ];
  public businesses = [
    {
      image: '../../assets/prop.png',
      name: 'Property Management',
      amount: '$1,250'
    },
    {
      image: '../../assets/biz.png',
      name: 'AT&T',
      amount: '$75'
    },
    {
      image: '../../assets/dwp.png',
      name: 'Department of Water',
      amount: '$35'
    },
  ];
  public person = [];
  public business = [];
  public searchTerm: string;
  public searchTerm2: string;
  public method: string;
  public set: any;
  public balance: any = 3042;
  public amount: any;
  public setB: any;
  public bills: any;
  public load: any;

  constructor(public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,
    public nav: NavController,
    private translate : TranslateService,
    public appHelperService: AppHelperService) { }

  ngOnInit() {
  }

  getPerson(){
    this.person = this.filterPeople();
    console.log(this.person)
  }

  getBusiness(){
    this.business = this.filterBusiness();
    console.log(this.business)
  }

  filterPeople(){
    return this.people.filter((item) => {
        return item.id.indexOf(this.searchTerm) > -1;
    });      
  }

  filterBusiness(){
    return this.businesses.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchTerm2.toLowerCase()) > -1;
    });      
  }

  setPerson(person){
    this.set = {
      image: '../assets/Agent.png',
      name: person.name,
      location: person.location,
      phone: person.phone
    }
    this.searchTerm = '';
  }

  setBusiness(){
    this.setB = true;
    this.searchTerm = '';
  }

  clearSearch(){
    this.set = '';
    this.setB = '';
    this.person = [];
    this.business = [];
  }

  segmentChanged(event){
    this.method = event.value;
  }

  async confirm(){
    this.load = await this.loadingCtrl.create({
      message: this.translate.instant("pay.sending")
    });
      this.load.present();
      setTimeout(()=>{
        this.load.dismiss();
        this.presentConfirmSuccess();
      }, 3000);
  }

  async presentConfirmSuccess() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("pay.sent"),
      message: this.translate.instant("pay.sent_message"),
      buttons: [
        {
          text: this.translate.instant("settings.dismiss"),
          role: 'cancel',
          handler: () => {
            this.nav.navigateForward('/agents');
          }
        }
      ]
    });
    return await alert.present();
  }

}

