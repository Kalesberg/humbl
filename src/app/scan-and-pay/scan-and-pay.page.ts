import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-and-pay',
  templateUrl: './scan-and-pay.page.html',
  styleUrls: ['./scan-and-pay.page.scss'],
})
export class ScanAndPayPage implements OnInit {

  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string ="test qrdata"
  constructor() { }

  ngOnInit() {
  }

}
