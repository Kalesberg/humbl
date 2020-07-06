import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-dashboard',
  templateUrl: './qr-dashboard.page.html',
  styleUrls: ['./qr-dashboard.page.scss'],
})
export class QrDashboardPage implements OnInit {

  public qrForOptions = {
    scan: false,
    pay: false,
    tip: false,
    review: false,
    qrcolor:''
  }

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  next(){
    this.nav.navigateForward('/qr-generate-info/'+ JSON.stringify(this.qrForOptions));
  }


}
