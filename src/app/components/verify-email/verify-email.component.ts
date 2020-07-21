import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {

  isVerified: boolean = false;
  isError: boolean = false;
  errorMessage: string = "";

  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    public angularfire: AngularFirestore,
    private http: HttpClient,
    public router: Router,) { }

  ngOnInit() {
    this.isVerified = false;
    this.isError = false;
  }
  ngAfterViewInit(){
    const code = this.route.snapshot.queryParams['oobCode'];
    if(code){
      let observable = this.http
                .post(environment.apiUrl + 'verifyEmails/',
                    {oobCode: code, appType: "merchant" },
                    { headers: { "Content-Type": "application/json" } });
    observable.toPromise().then((resp: any) => {
      if(resp && resp.status){
        this.isError = false;
        this.isVerified = true;
      }
      else{
        this.isError = true;
        this.isVerified = false;
        if(!resp || (resp && resp.message=="Bad request.")){
          this.errorMessage = 'Oops! Something went wrong. Try again later.';
        } else {
          this.errorMessage = resp.message;
        }
      }      
    }).catch(err => {
        this.isError = true;
        this.isVerified = false;
        if(err && err.message){
          this.errorMessage = err.message;
        }      
        else {
          this.errorMessage = 'Oops! Something went wrong. Try again later.';
        }
      });
    }
  }

}
