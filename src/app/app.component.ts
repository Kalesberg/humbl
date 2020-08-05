import { Component, NgZone } from '@angular/core';
import { Platform, AlertController, MenuController, NavController  } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import * as firebase from 'firebase/app';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { SettingsService } from './services/settings.service';
import * as CryptoJs from 'crypto-js';
import { SwUpdate } from '@angular/service-worker';
import { PushService } from './services/push.service';
import { 
  Plugins, 
  AppState,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import { Storage } from '@ionic/storage'
import { TranslateService } from '@ngx-translate/core';
const { PushNotifications } = Plugins;
const { SplashScreen } = Plugins;
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
      title: 'terminal',
      url: '/pos',
      icon: 'calculator'
    },
    {
      title: 'messages',
      url: '/messages',
      icon: 'document-text-outline'
    },
    {
      title: 'reports',
      url: '/reports',
      icon: 'file-tray-full-outline'
    },
    {
      title: 'reviews',
      url: '/reviews',
      icon: 'people'
    },
    // {
    //   title: 'offers',
    //   url: '/offers',
    //   icon: 'cash',
    // },
    {
      title: 'qr',
      url: '/qr-dashboard',
      icon: 'qr-code',
      isQrMenu: true
    },
    {
      title: 'settings',
      url: '/settings',
      icon: 'cog'
    },
    // {
    //   title: 'agents',
    //   url: 'http://localhost:8101/home',
    //   icon: 'person'
    // }
  ];
  public isDeepLink: boolean = false;

  constructor(
    public platform: Platform,
    private alertCtrl: AlertController,
    private network: Network,
    private authService: AuthService,
    public router: Router,
    public menuCtrl: MenuController,
    private settingsService: SettingsService,
    public ngZone: NgZone,
    private swUpdate: SwUpdate,
    private pushService: PushService,
    private translate: TranslateService,
    private storage: Storage,
    public nav: NavController
    ) {

    this.initializeApp();
    this.isDeepLink = false;
    this.authCheck();
    if (this.platform.is("capacitor")) {
      this.authCheck().then(async (userStatus) => {
        if (!this.isDeepLink) {
          console.log(userStatus, this.uid);
          if (userStatus && this.uid) {
            this.router.navigateByUrl('/pos');
            // await this.authService.redirectTo(this.uid);
          } else {
            if (SplashScreen) {
              SplashScreen.hide();
            }
            this.router.navigateByUrl('/home');
          }
        }
      });
    } else {
      this.authCheck();
    }

    this.translate.setDefaultLang('en');
    this.translate.langs = ['en', 'ep'];  

    // Or to get a key/value pair
    this.storage.get('lang').then((val) => {

      if (val !== undefined) {
        this.translate.use(val);
      }
      else {
        this.translate.use('en')
      }
    });
  }

  // ionViewWillEnter(){
  //   this.authCheck();
  // }

  initializeApp() {

    this.platform.ready().then(() => {
      // SplashScreen.hide();
      // this.deeplinks.route({
      //   '/success/:slug': 'success',
      // }).subscribe((match) => {
      //   console.log("----------Succeefully matched route--------");
      //   const internalPath = `/${match.$route}/${match.$args['slug']}`;
      //   this.ngZone.run(() => {
      //     this.router.navigateByUrl(internalPath);
      //   });
      // }, (noMatch) => {
      //     console.log("not mathching!!!!");
      // })

      App.addListener('appStateChange', (state: AppState) => {
        console.log('App state changed. Is active?', state.isActive);
      });

      App.addListener('appUrlOpen', (data: any) => {
        console.log("----Opening New Url----", data.url);
        this.ngZone.run(() => {
          const slug = data.url.split(".io").pop();
          console.log("----Url Link----", slug);
          if (slug) {
            this.isDeepLink = true;
            this.router.navigateByUrl(slug);
          }
        })
      })

      this.listenDisconnect();
      if(!this.platform.is('ios') && !this.platform.is('android')){
        this.pushService.receiveMessage();
      }
    });
    if (this.swUpdate.available) {
      this.swUpdate.available.subscribe(() => {
        if (confirm(this.translate.instant("home.newversion")))
          window.location.reload();
      });
    }

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
    });
  }

  private listenDisconnect() {
    this.network.onDisconnect()
      .subscribe(async () => {
        await this.showAlert1();
      });
  }

  setUpPushNotifications(){
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        PushNotifications.register();
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            this.settingsService.updateMessageToken(token.value || null);
          }
        );
      } else {
        PushNotifications.addListener('registrationError',
          (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
          }
        );
      }
    });
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert(`${notification.title}: ${notification.body}`);
      }
    );
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        // alert(notification);
        this.router.navigateByUrl('/messages');
      }
    );
  }

  // private listenConnect(){
  //   this.network.onConnect()
  //     .subscribe(async () => {
  //       await this.showAlert2();
  //     });
  // }

  async showAlert1() {
    const alert1 = await this.alertCtrl.create({
      header: this.translate.instant("header"),
      subHeader: this.translate.instant("subheader"),
      buttons: [this.translate.instant("home.button")]
    });
    return await alert1.present();
  }

  // async showAlert2() {
  //   const alert2 = await this.alertCtrl.create({
  //     header: 'Network Connected',
  //     subHeader: 'Successfully connected to the internet!',
  //     buttons: ['OK']
  //   });
  //   return await alert2.present();
  // }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.user = false;
      this.username = "";
      this.uid = "";
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
    this.router.navigateByUrl('/qr');
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  authCheck(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.user = true;
          this.uid = user.uid;
          this.getProfile();
          if(this.platform.is('capacitor') && (this.platform.is('ios') || this.platform.is('android'))){
            this.setUpPushNotifications();
          } else {
            this.pushService.requestPermission();
            this.pushService.receiveMessage();
          }
          resolve(true);
        } else {
          this.user = false;
          resolve(false);
        }
      });
    });
  }

  getProfile(){
    this.settingsService
    .getBusinessProfile()
    .onSnapshot((userProfileSnapshot)=>{
      console.log("userProfileSnapshot", userProfileSnapshot)
      this.userProfile = userProfileSnapshot.data();
      if(this.userProfile){
        let username = this.userProfile.email;
        this.username = "merchant:" + CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(username));
        this.businessEmail = this.userProfile.businessEmail;
        this.imageURL = this.userProfile.logoUrl;
        this.business = this.userProfile.businessName;
        if(!this.imageURL){
          this.imageURL = '../../assets/avatar.png';
        }
      }
    })
    // .get()
    // .then( userProfileSnapshot => {
    //   this.userProfile = userProfileSnapshot.data();
    //   if(this.userProfile){
    //     let username = this.userProfile.email;
    //     this.username = "merchant:" + CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(username));
    //     this.businessEmail = this.userProfile.businessEmail;
    //     this.imageURL = this.userProfile.logoUrl;
    //     this.business = this.userProfile.businessName;
    //     if(!this.imageURL){
    //       this.imageURL = '../../assets/avatar.png';
    //     }
    //   }
    // });
  }

  async posRedirect() {
    let qrLocalData= await this.storage.get('barcodestandee');
    let isQrExist = false;
    if(qrLocalData){
      if(qrLocalData.qrData){
        isQrExist =true;
      }
    }
    this.nav.navigateRoot(isQrExist? '/qr-standee': '/qr-dashboard');
  }
}
