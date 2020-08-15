import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.page.html',
  styleUrls: ['./pay-bills.page.scss'],
})
export class PayBillsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoPayableBills() {
    this.navController.navigateForward('agent/payable-bills')
  }
}
