import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pay-bills-detail',
  templateUrl: './pay-bills-detail.page.html',
  styleUrls: ['./pay-bills-detail.page.scss'],
})
export class PayBillsDetailPage implements OnInit {

  @ViewChild('typesegment') typesegment:any;
  constructor() { }

  ngOnInit() {
  }
  ionViewWillEnter() {    
    if(this.typesegment)
      this.typesegment.value = "humble";
  }
}
