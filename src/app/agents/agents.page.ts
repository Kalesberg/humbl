import { Component, OnInit } from '@angular/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage implements OnInit {

  constructor(private appHelperService: AppHelperService) { }

  ngOnInit() {
    //this.appHelperService.hideMenu();
  }

  // ionViewWillEnter() {    
  //   this.appHelperService.hideMenu();
  // }

  // ionViewWillLeave() {
  //   this.appHelperService.showMenu();
  // } 

}
