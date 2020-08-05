import { Component, OnInit } from '@angular/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {

  constructor(private appHelperService: AppHelperService) { }

  ngOnInit() {
    this.appHelperService.hideMenu();
  }

  ionViewWillEnter() {    
    this.appHelperService.hideMenu();
  }

  ionViewWillLeave() {
    this.appHelperService.showMenu();
  } 

}
