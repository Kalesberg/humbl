import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MerchantProfilePageRoutingModule } from './merchant-profile-routing.module';
import { MerchantProfilePage } from './merchant-profile.page';
import { QRCodeModule } from 'angularx-qrcode';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantProfilePageRoutingModule,
    QRCodeModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [MerchantProfilePage]
})
export class MerchantProfilePageModule {}
