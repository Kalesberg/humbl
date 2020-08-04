import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

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
