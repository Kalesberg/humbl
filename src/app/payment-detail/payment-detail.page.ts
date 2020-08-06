import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {

  constructor(private navController:NavController) { }

  ngOnInit() {
  }

  payment() {
    this.navController.navigateForward('merchant/scan-and-pay')
  }

}
