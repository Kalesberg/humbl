import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

  public activeUrl: string;
  public currencyOptions = [
    { id: "USD", name: "USD"},
    { id: "AUD", name: "AUD"},
    { id: "BGN", name: "BGN"},
    { id: "BRL", name: "BRL"},
    { id: "CAD", name: "CAD"},
    { id: "CHF", name: "CHF"},
    { id: "CZK", name: "CZK"},
    { id: "DKK", name: "DKK"},
    { id: "EUR", name: "EUR"},
    { id: "GBP", name: "GBP"},
    { id: "HKD", name: "HKD"},
    { id: "HRK", name: "HRK"},
    { id: "IDR", name: "IDR"},
    { id: "ILS", name: "ILS"},
    { id: "ISK", name: "ISK"},
    { id: "JPY", name: "JPY"},
    { id: "KRW", name: "KRW"},
    { id: "MXN", name: "MXN"},
    { id: "MYR", name: "MYR"},
    { id: "NOK", name: "NOK"},
    { id: "NZD", name: "NZD"},
    { id: "PHP", name: "PHP"},
    { id: "PLN", name: "PLN"},
    { id: "RON", name: "RON"},
    { id: "RUB", name: "RUB"},
    { id: "SEK", name: "SEK"},
    { id: "SGD", name: "SGD"},
    { id: "THB", name: "THB"},
    { id: "TRY", name: "TRY"},
    { id: "ZAR", name: "ZAR"}
  ];

  public currentUser$ = new BehaviorSubject(null);
  
  public hideMenu() {
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.visibility = 'hidden';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.width = '0px';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.maxWidth = '0px';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.minWidth = '0px';
  }

  public showMenu() {
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.visibility = 'visible';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.width = '';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.maxWidth = '';
    (<any>document.getElementsByClassName('split-pane-side')[0]).style.minWidth = '';
  }
  
}
