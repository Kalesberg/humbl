import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrPaymentPageRoutingModule } from './qr-payment-routing.module';
import { QrPaymentPage } from './qr-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    QrPaymentPageRoutingModule
  ],
  declarations: [QrPaymentPage]
})
export class QrPaymentPageModule {}
