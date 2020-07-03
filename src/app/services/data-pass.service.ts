import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataPassService {

  public passedItems: any = null;

  public transactionData = [];

  public previousTx: any = null;

  public walletSelect: string = 'digibyte';

}
