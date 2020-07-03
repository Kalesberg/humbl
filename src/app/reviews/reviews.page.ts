import { Component, ChangeDetectorRef } from '@angular/core';
import {ReviewsService} from '../services/reviews.service';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage {
  // public reviews = [
  //   {
  //     name: '⭐️⭐️⭐️⭐️⭐️',
  //     amount: 'The best',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️',
  //     amount: 'Rude employee, good coffee',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️⭐️⭐️',
  //     amount: 'Nice place',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️⭐️⭐️⭐️',
  //     amount: 'Worth the hype',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️⭐️⭐️',
  //     amount: 'Nice,b ut bathroom was dirty',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️⭐️⭐️⭐️',
  //     amount: 'Love this place',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️⭐️⭐️⭐️',
  //     amount: 'Friendliest staff ever!',
  //     hourly: '$15'
  //   },
  //   {
  //     name: '⭐️⭐️⭐️⭐️⭐️',
  //     amount: 'Excellent service',
  //     hourly: '$15'
  //   },
  // ];
  public reviews: any;
  public reviewList: Observable<any>;
  public currentUser: string;
  public userProfile: any;
  public stripeId: string;
  public searchTerm: string;
  constructor(public reviewService: ReviewsService,
    public settingsService: SettingsService,
    public changeRef: ChangeDetectorRef,
    public alertCtrl: AlertController) {

  }


  ionViewWillEnter(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
      }
      this.settingsService
        .getBusinessProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.stripeId = this.userProfile.stripeId;
          this.getReviews(); 
      });  
    });    
  }

  getReviews() {
    this.reviews = [];
    firebase.firestore().collection(`reviews/${this.stripeId}/review`).orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(async(doc)=> {
              this.reviews.push(doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }


  async setFilteredItems() {
    if(!this.searchTerm){
      this.getList();
    } else {
      this.reviews = await this.filterItems(this.searchTerm);
      this.changeRef.detectChanges();
    }
  }

  // onSearchInput(){
  //   this.changeRef.detectChanges();
  // }

  filterItems(searchTerm){
    return this.reviews.filter((item: any) => {
        return item.txid.indexOf(searchTerm) > -1;
    });    
  }

  getList(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
      }
      this.settingsService
        .getBusinessProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.stripeId = this.userProfile.stripeId;
          this.getReviews(); 
        //   this.reviewList = this.reviewService.getReviews(this.stripeId).valueChanges();
        //   this.reviewList.subscribe(res =>{
        //     this.reviews = res;
        //     console.log(this.reviews);
        // });
      });  
    });
  }

  async confirmDelete(stripeId, id) {
    let alert = await this.alertCtrl.create({
      header: 'This record will be deleted.',
      message: `Are you sure?`,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
          }
        },
        {
          text: 'DELETE',
          cssClass: 'primary',
          handler: () => {
            this.reviewService.removeReview(stripeId, id);
            this.getReviews();
          }
        },
      ]
    });
    return await alert.present();
  }

}
