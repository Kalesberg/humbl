import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.page.html',
  styleUrls: ['./transaction-summary.page.scss'],
})
export class TransactionSummaryPage implements OnInit {
  
  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string ="test qrdata"

  constructor() { }

  ngOnInit() {
  }

}
