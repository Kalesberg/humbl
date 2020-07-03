import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  public reviewProfile: firebase.firestore.CollectionReference;
  constructor() { 
      firebase.auth().onAuthStateChanged(user => {
        console.log(user.uid)
      });
  }

  // getReviews(sid: string): firebase.firestore.DocumentReference {
  //   this.reviewProfile = firebase.firestore().collection(`/reviews/${sid}/review`);
  //   return this.reviewProfile.orderBy("date") ;
  // }

  removeReview(sid: any, reviewId: string): Promise<any> {
    console.log(sid, reviewId) 
    this.reviewProfile = firebase.firestore().collection(`/reviews/${sid}/review`);
    return this.reviewProfile.doc(reviewId).delete();
  }

  async updateReview(review: any): Promise<any>{
    this.reviewProfile = firebase.firestore().collection(`/reviews/${review.sid}/review`);
    const newTxRef: firebase.firestore.DocumentReference = await this.reviewProfile.add({});
    return newTxRef.update({
      date: new Date(),
      total: review.total,
      txid: review.txid,
      logo: review.logo,
      address: review.address,
      business: review.business,
      sid: review.sid,
      message: review.message,
      rating: review.rating,
      id: newTxRef
    }); 
  }

} 
