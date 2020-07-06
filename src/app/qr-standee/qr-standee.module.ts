import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrStandeePageRoutingModule } from './qr-standee-routing.module';
import { QrStandeePage } from './qr-standee.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    QrStandeePageRoutingModule
  ],
  declarations: [QrStandeePage]
})
export class QrStandeePageModule {}
