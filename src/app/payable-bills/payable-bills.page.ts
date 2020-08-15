import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payable-bills',
  templateUrl: './payable-bills.page.html',
  styleUrls: ['./payable-bills.page.scss'],
})
export class PayableBillsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }
  gotoPaymentDetails() {
    this.navController.navigateForward('agent/pay-bills-detail')
  }
}
