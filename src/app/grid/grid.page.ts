import { Component, OnInit } from '@angular/core';
import { AppHelperService } from '../services/app-helper.service';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {

  public userProfile: any;
  public currentDate: any;
  public stripeId: any;
  public extSum: any;
  public recent_transaction: any;
  public recent_review: any;
  public pending_message_count: any;
  public uid: any;
  
  constructor(private appHelperService: AppHelperService,public settingsService: SettingsService) { }

  ngOnInit() {
    this.currentDate = new Date();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.settingsService
        .getBusinessProfile(user.uid)
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.stripeId = this.userProfile.stripeId;
          this.getExtSum();
          this.getRecentReview();
          this.getMessages();
        });
      }
    });
  }

  getExtSum() {
    this.extSum = 0;
    this.recent_transaction = false;
    firebase.firestore().collection(`exttransactions/${this.stripeId}/txList`).orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      let i = 0;
      let today = new Date();
      querySnapshot.forEach(async(doc)=> {
        if(i === 0) {
          this.recent_transaction = doc.data();
          console.log(this.recent_transaction.date.toDate().getDate());
        }
        if(doc.data().date.toDate().getDate() === today.getDate() && doc.data().date.toDate().getMonth() === today.getMonth() && doc.data().date.toDate().getFullYear() === today.getFullYear()) {
          this.extSum += parseFloat(doc.data().usdTotal);
        }
        i++;
      });
      console.log(this.recent_transaction);
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }

  getMessages() {
    this.pending_message_count = "";
    firebase.firestore().collection('businessProfile/' + this.uid + '/conversations').get().then(async snapshot => {
      this.pending_message_count = 0;
      snapshot.forEach(item => {
        let conversations = item.data().conversations;
        let unread_count = conversations.filter(item => { return item.messageRead === 0; }).length;
        this.pending_message_count += unread_count;
      });
    });
  }

  getRecentReview() {
    this.recent_review = false;
    firebase.firestore().collection(`reviews/${this.stripeId}/review`).orderBy("date", "desc").limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async(doc)=> {
        this.recent_review = doc.data();
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }

  counter(i: any) {
    return new Array(parseInt(i));
  }

}
