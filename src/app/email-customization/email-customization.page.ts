import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-email-customization',
  templateUrl: './email-customization.page.html',
  styleUrls: ['./email-customization.page.scss'],
})
export class EmailCustomizationPage implements OnInit {
  action: any;
  private routerOutlet: IonRouterOutlet;
  constructor(private activatedActivated: ActivatedRoute, 
    private menuController: MenuController) {
    this.action = this.activatedActivated.snapshot.queryParams['mode'];
   }

  ngOnInit() {
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.visibility = 'hidden';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.width = '0px';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.maxWidth = '0px';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.minWidth = '0px';
  }

  ionViewWillEnter() {
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.visibility = 'hidden';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.width = '0px';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.maxWidth = '0px';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.minWidth = '0px';
    // this.nav.swipeBackEnabled = false;
  }

  ionViewWillLeave() {
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.visibility = 'visible';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.width = '';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.maxWidth = '';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.minWidth = '';
    // this.nav.swipeBackEnabled = true;
  } 

}
