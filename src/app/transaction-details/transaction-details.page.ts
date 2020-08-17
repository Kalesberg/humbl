import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoTransactionSummary(){
    this.navController.navigateForward('merchant/transaction-summary')
  }

}
