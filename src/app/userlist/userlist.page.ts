import { Component, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from '../services/settings.service'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { NavController, 
  ModalController, 
  LoadingController, 
  AlertController,
} from '@ionic/angular';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage {
  public total_users: any = [];
  public users: any = [];
  public cards: any = [];
  public searchCategory: string;
  public userProfile: any;
  public email: string;
  public username: string = '';
  public uid: string;
  public loading: any;
  public business: string;
  public businessSend: string;
  public merchantID: string;
  public user_ID: String;
  public currentDate: string;
  public searchTerm: string = "";

  constructor(public settings: SettingsService,
    public storage: Storage,
    public navCtrl: NavController, 
    private http: HttpClient,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public router: Router,
    private changeDetector : ChangeDetectorRef,
    private route: ActivatedRoute,
    public translate: TranslateService) {
      this.searchCategory = 'merchants'
  }

  ionViewWillEnter(){
    this.getUsers();
    this.searchTerm = '';
    this.users = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.uid = user.uid;
        this.settings
        .getBusinessProfile().get()
        .then(async (userProfileSnapshot) => {
          this.userProfile = userProfileSnapshot.data();
          if(this.userProfile){
            this.username = await this.userProfile.businessEmail;
            this.business = this.userProfile.businessName;
          }
        });
      }
    });
  }

  ionViewDidEnter(){
    this.changeDetector.detectChanges();
  }

  changeSearchCategory(event){
    this.searchCategory = event.detail.value;
    this.getUsers();
    console.log(event.detail.value);
  }

  getUsersSearch() {
    const total_users = this.total_users;
    if(this.searchTerm !== '') {
      this.users = total_users.filter(val => {
        return (val.businessName && val.businessName.indexOf(this.searchTerm) > -1) || (val.firstname && val.firstname.indexOf(this.searchTerm) > -1) || (val.lastname && val.lastname.indexOf(this.searchTerm) > -1) || (val.message && val.message.indexOf(this.searchTerm) > -1);
      });  
    } else {
      this.users = total_users;
    }
  }

  async getUsers() {
    let searchCollection;
    this.users = [];
    if(this.searchTerm !== ""){
      const loading = await this.loadingCtrl.create();
      loading.present();
      firebase.firestore().collection('userProfile')
      .get()
      .then(async (querySnapshot) => {
        let users = [];
        querySnapshot.forEach(async(doc)=> {
          users.push({ ...doc.data(), id: doc.id });
        });
        const user_promises = users.map(async user=>{
          return firebase.firestore().doc('/businessProfile/' + this.uid + '/conversations/' + user.id).get().then(snapshot => {
            if(snapshot.exists) {
              let conversations = snapshot.data().conversations;
              console.log(conversations);
              let conversation_id = conversations[conversations.length - 1].conversationId;
              let unread_count = conversations.filter(val => { return val.messageRead === 0; }).length;
              return firebase.firestore().doc('/conversations/' + conversation_id).get().then(conversation => {
                let messages = conversation.data().messages.filter(val => { return val.type === 'text' && val.sender === user.id; });
                let last_message;
                if(messages.length > 0){
                  last_message = messages[messages.length - 1].message;
                } else {
                  last_message = '';
                }
                return { ...user, unread_count, message: last_message};
              })
            } else {
              return { ...user, unread_count: 0, message: ''};
            }
          });
        });
        const total_users = await Promise.all(user_promises);
        this.users = total_users.filter(val => {
          return (val.businessName && val.businessName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (val.firstname && val.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (val.lastname && val.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (val.message && val.message.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
        });
        loading.dismiss();
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }
  }

  setUserData(user_id) {
    return firebase.firestore().doc('/userProfile/' + this.uid + '/conversations/' + user_id).get().then(snapshot => {
      if(snapshot.exists) {
        let conversations = snapshot.data().conversations;
        console.log(conversations);
        let conversation_id = conversations[conversations.length - 1].conversationId;
        let unread_count = conversations.filter(val => val.messageRead === 0).length;
        firebase.firestore().doc('/conversations/' + conversation_id).get().then(conversation => {
          let messages = conversation.data().messages.filter(val => val.type === 'text');
          let last_message = messages[messages.length - 1].message;
          return { unread_count, message: last_message};
        })
      } else {
        return { unread_count: 0, message: ''};
      }
    }).catch(error => {
      return { unread_count: 0, message: ''};
    })
  }

  chatUser(user) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: user.id,
        userType: this.searchCategory
      }
    };
    this.router.navigate(['chat'], navigationExtras);
  }

  toSettings() {
    this.router.navigateByUrl('tab3');
  }

  toHome() {
    this.router.navigateByUrl('pos');
  }


}