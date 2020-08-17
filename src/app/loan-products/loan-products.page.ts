import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loan-products',
  templateUrl: './loan-products.page.html',
  styleUrls: ['./loan-products.page.scss'],
})
export class LoanProductsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  signLoanForn() {
    this.navController.navigateForward('/agent/loan-products-form')
  }

}
