import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanAndPayPageRoutingModule } from './scan-and-pay-routing.module';
import { ScanAndPayPage } from './scan-and-pay.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanAndPayPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [ScanAndPayPage]
})
export class ScanAndPayPageModule {}
