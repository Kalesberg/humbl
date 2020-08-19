import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loan-products-form',
  templateUrl: './loan-products-form.page.html',
  styleUrls: ['./loan-products-form.page.scss'],
})
export class LoanProductsFormPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  signLoanProduct() {
    this.navController.navigateForward('/agent/loan-products-sign')
  }
}
