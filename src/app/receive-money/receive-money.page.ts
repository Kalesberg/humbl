import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-receive-money',
  templateUrl: './receive-money.page.html',
  styleUrls: ['./receive-money.page.scss'],
})
export class ReceiveMoneyPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoPendingPickup() {
    this.navController.navigateForward('agent/pending-pickups')
  }
}
