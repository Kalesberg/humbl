import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

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
    public nav: NavController) { }

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
      message: 'Sending Payment'
    });
      this.load.present();
      setTimeout(()=>{
        this.load.dismiss();
        this.presentConfirmSuccess();
      }, 3000);
  }

  async presentConfirmSuccess() {
    let alert = await this.alertCtrl.create({
      header: 'Payment Sent',
      message: 'Payment ID: 123687-qad',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.nav.navigateForward('home');
          }
        }
      ]
    });
    return await alert.present();
  }

}

