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
  public user: boolean = false;
  public uid: string;
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
    if (this.platform.is("capacitor")) {
      this.authCheck().then(async (userStatus) => {        
        if (!this.isDeepLink) {
          this.authService.authCheckAndRedirect();
        }
      });
    } 
    else {
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
        this.router.navigateByUrl('/merchant/messages');
      }
    );
  }

  async showAlert1() {
    const alert1 = await this.alertCtrl.create({
      header: this.translate.instant("header"),
      subHeader: this.translate.instant("subheader"),
      buttons: [this.translate.instant("home.button")]
    });
    return await alert1.present();
  }

  authCheck(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.user = true;
          this.uid = user.uid;
          // this.getProfile();
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
}
