import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AddItemsComponent } from './add-items/add-items.component';
import { ScannerComponent } from './scanner/scanner.component';
import { CoinSelectComponent } from './coin-select/coin-select.component';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Stripe} from '@ionic-native/stripe/ngx';
import {environment} from '../environments/environment';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import * as firebase from 'firebase/app';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MbscModule } from '@mobiscroll/angular';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent, AddItemsComponent, ScannerComponent, CoinSelectComponent],
  entryComponents: [
    AddItemsComponent,
    CoinSelectComponent,
    ScannerComponent
  ],
  imports: [ 
    MbscModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule, 
    AngularFireStorageModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    HttpClientModule,
    ZXingScannerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Network,
    BarcodeScanner,
    EmailComposer,
    Stripe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
