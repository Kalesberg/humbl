import { Injectable, NgZone } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public ngZone: NgZone,
    private storage: Storage) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
        if (user && user.uid && user.emailVerified) {
          let userData = await this.storage.get('humble_user');
          if(userData && !userData.isAgent){
            resolve(true);
          } else {
            this.ngZone.run(()=> this.router.navigateByUrl('/home'));
            resolve(false);
          }
        } else {
          console.log('User is not logged in');
          this.ngZone.run(()=> this.router.navigateByUrl('/home'));
          resolve(false);
        }
      });
    });
  }
}
