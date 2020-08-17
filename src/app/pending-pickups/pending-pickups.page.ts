import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pending-pickups',
  templateUrl: './pending-pickups.page.html',
  styleUrls: ['./pending-pickups.page.scss'],
})
export class PendingPickupsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  reciveMoney() {
    this.navController.navigateForward('/agent/receive-money-form')
  }

}
