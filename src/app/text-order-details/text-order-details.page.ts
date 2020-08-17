import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-text-order-details',
  templateUrl: './text-order-details.page.html',
  styleUrls: ['./text-order-details.page.scss'],
})
export class TextOrderDetailsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }
  orderChat(){
    this.navController.navigateForward('merchant/order-chat')
  }
}
