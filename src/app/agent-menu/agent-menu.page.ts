import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AppHelperService } from '../services/app-helper.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-agent-menu',
  templateUrl: './agent-menu.page.html',
  styleUrls: ['./agent-menu.page.scss'],
})

export class AgentMenuPage implements OnInit {

  public userProfile: any;
  public username: string;
  public business: string;
  public businessEmail: string;
  public logo: string;
  public imageURL: string;
  public loggedin: boolean = false;
  public user: boolean = false;
  public uid: string;
  public appPages = [
    // {
    //   title: 'terminal',
    //   url: '/agent/pos',
    //   icon: 'calculator'
    // },
    // {
    //   title: 'reports',
    //   url: '/agent/reports',
    //   icon: 'file-tray-full-outline'
    // },
    {
      title: 'sendmoney',
      url: '/agent/send-money',
      icon: 'phone-portrait-outline'
    },
    {
      title: 'receivemoney',
      url: '/agent/receive-money',
      icon: 'mail-outline'
    },
    {
      title: 'exchangemoney',
      url: '/agent/exchange-money',
      icon: 'mail-outline'
    },
    {
      title: 'paybills',
      url: '/agent/pay-bills',
      icon: 'cash-outline'
    },
    {
      title: 'loanproduct',
      url: '/agent/loan-products',
      icon: 'document-text-outline'
    },
    {
      title: 'agentsettings',
      url: '/agent/agent-settings',
      icon: 'settings-outline'
    },
    // {
    //   title: 'agents',
    //   url: 'http://localhost:8101/home',
    //   icon: 'person'
    // }
  ];

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    public router: Router,
    public menuCtrl: MenuController,
    private storage: Storage,
    public nav: NavController,
    private actRoute: ActivatedRoute,
    public appHelperService: AppHelperService) { }

  ngOnInit() {

    this.appHelperService.activeUrl = (this.actRoute as any)._routerState.snapshot.url;
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.uid) {
        this.uid = user.uid;
        this.user = true;
        this.settingsService
        .getBusinessProfile(user.uid)
        .get()
        .then(userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.business = this.userProfile.businessName;
          this.logo = this.userProfile.logoUrl;
          this.businessEmail = this.userProfile.businessEmail? this.userProfile.businessEmail.toLowerCase(): "";
          this.logo = this.userProfile.logoUrl;
          if(!this.logo){
            this.logo = "../../assets/avatar.png";
          }
          // this.calculateFee();
        });
      }
      else {
        this.user = false;
      }
      
    });   
  }
  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.user = false;
      // this.username = "";
      this.uid = "";
      this.appHelperService.currentUser$.next(null);
      this.storage.remove('humble_user');
      this.toggleMenu();
      this.router.navigateByUrl('/login');
    });
  }

  logIn(): void {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
  }

  toProfile(){
    this.toggleMenu();
    this.router.navigateByUrl('/merchant/qr');
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
  async posRedirect() {
    let qrLocalData= await this.storage.get('barcodestandee');
    let isQrExist = false;
    if(qrLocalData){
      if(qrLocalData.qrData){
        isQrExist =true;
      }
    }
    this.appHelperService.activeUrl = isQrExist? '/merchant/qr-standee': '/merchant/qr-dashboard';
    this.nav.navigateRoot(isQrExist? '/merchant/qr-standee': '/merchant/qr-dashboard');
  }
  
}
