import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agent-terms',
  templateUrl: './agent-terms.page.html',
  styleUrls: ['./agent-terms.page.scss'],
})
export class AgentTermsPage implements OnInit {

  isTermAccepted: boolean = false;

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoHome() {
    if(this.isTermAccepted)
      this.navController.navigateForward('/agents')
  }

}
