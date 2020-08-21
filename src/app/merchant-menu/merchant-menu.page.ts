import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { SettingsService } from '../services/settings.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { TranslateService } from '@ngx-translate/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-merchant-menu',
  templateUrl: './merchant-menu.page.html',
  styleUrls: ['./merchant-menu.page.scss'],
})
export class MerchantMenuPage implements OnInit {
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
    {
      title: 'payments',
      url: '/merchant/pos',
      icon: 'card-outline'
    },
    {
      title: 'textorder',
      url: '/merchant/messages',
      icon: 'chatbubble'
    },
    {
      title: 'transaction',
      url: '/merchant/reports',
      icon: 'logo-usd'
    },
    // {
    //   title: 'reports',
    //   url: '/merchant/reports',
    //   icon: 'file-tray-full-outline'
    // },
    {
      title: 'qr',
      url: '/merchant/qr-dashboard',
      icon: 'qr-code',
      isQrMenu: true
    },
    // {
    //   title: 'settings',
    //   url: '/merchant/settings',
    //   icon: 'cog'
    // },
    {
      title: 'merchantprofile',
      url: '/merchant/merchant-profile',
      icon: 'card-outline'
    },
    // {
    //   title: 'payments',
    //   url: '/merchant/payment-detail',
    //   icon: 'card-outline'
    // },
    // {
    //   title: 'textorder',
    //   url: '/merchant/text-order-details',
    //   icon: 'chatbubble'
    // },
    // {
    //   title: 'transaction',
    //   url: '/merchant/reports',
    //   icon: 'logo-usd'
    // },
    {
      title: 'reviews',
      url: '/merchant/reviews',
      icon: 'star'
    },
    // {
    //   title: 'offers',
    //   url: '/merchant/offers',
    //   icon: 'pricetag',
    //   iconcss:"offertag"
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
    public appHelperService: AppHelperService) {
   }

  ngOnInit() {

    this.appHelperService.activeUrl = (this.actRoute as any)._routerState.snapshot.url;
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.uid) {
        this.uid = user.uid;
        this.user = true;
        this.settingsService
        .getBusinessProfile()
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
