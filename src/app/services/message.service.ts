import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messagesList: firebase.firestore.CollectionReference;
  public userId: string;
 
  constructor() { 
    firebase.auth().onAuthStateChanged(user => {
        if(user && user.uid){
          this.userId = user.uid; 
          this.messagesList = firebase.firestore().collection(`messages`); 
        }    
      });
  }

  getMessageList(): firebase.firestore.CollectionReference {
    this.messagesList = firebase.firestore().collection(`messages`);
    return this.messagesList
  }

  getMessage(id: string): firebase.firestore.DocumentReference {
    return firebase.firestore().doc(`/messages/${id}`);
  }

  removeMessage(id: string): Promise<any> { 
    this.messagesList = firebase.firestore().collection(`messages`); 
    return this.messagesList.doc(id).delete();
  }
}
