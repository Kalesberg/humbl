import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-text-order',
  templateUrl: './text-order.page.html',
  styleUrls: ['./text-order.page.scss'],
})
export class TextOrderPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {}

  sendLink() {
    this.navController.navigateForward('merchant/chat')
  }
}
