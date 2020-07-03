import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public transactionList: firebase.firestore.CollectionReference;;
  public orderList: firebase.firestore.DocumentReference;; 
  public dupTransactionList: firebase.firestore.CollectionReference;;
  public userId: string;
 
  constructor() { 
    firebase.auth().onAuthStateChanged(user => {
        if(user.uid){
          this.userId = user.uid; 
          this.transactionList = firebase.firestore().collection(`/transactions/${user.uid}/txList`); 
        }    
      });
  }

  getTxList(uid): firebase.firestore.CollectionReference {
    this.transactionList = firebase.firestore().collection(`/transactions/${uid}/txList`);
    return this.transactionList
  }

  getTx(txId: string): firebase.firestore.DocumentReference {
    return firebase.firestore().doc(`/transactions/${this.userId}/txList/${txId}`);
  }

  getExtTxList(id): firebase.firestore.CollectionReference  {
    this.dupTransactionList = firebase.firestore().collection(`/exttransactions/${id}/txList`);  
    return this.dupTransactionList
  }  

  getExtTx(id: string, txId: string): firebase.firestore.DocumentReference {
    return firebase.firestore().doc(`/exttransactions/${id}/txList/${txId}`);
  }

  removeExtTx(stripeId: string, id: string): Promise<any> {
    this.dupTransactionList = firebase.firestore().collection(`/exttransactions/${stripeId}/txList`);   
    return this.dupTransactionList.doc(id).delete();
  }

  removeTx(uid, id: string): Promise<any> { 
    this.transactionList = firebase.firestore().collection(`/transactions/${uid}/txList`); 
    return this.transactionList.doc(id).delete();
  }
 
  async createTransaction(pass: Transaction): Promise<any> {
    let date = new Date();
    let txList = firebase.firestore().collection(`/transactions/${this.userId}/txList`);
    const newTxRef: firebase.firestore.DocumentReference = await txList.add({});
    return newTxRef.update({
      date: date,
      coin: pass.coin,
      txId: pass.txId,
      usdTotal: pass.usdTotal,
      items: pass.items,
      tip: pass.tip,
      id: newTxRef.id
    }); 
  }
}
