import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public route: Router, private storage : Storage, private translate : TranslateService) {

  }

  toLoginPage() {
    this.route.navigateByUrl('login');
  }

  toSignupPage() {
    this.route.navigateByUrl('signup');
  }

  setAppLang(lang : string) {
    this.translate.use(lang);
    this.storage.set("lang", lang);
  }

}
