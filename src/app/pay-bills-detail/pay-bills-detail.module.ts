import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayBillsDetailPageRoutingModule } from './pay-bills-detail-routing.module';
import { PayBillsDetailPage } from './pay-bills-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayBillsDetailPageRoutingModule
  ],
  declarations: [PayBillsDetailPage]
})
export class PayBillsDetailPageModule {}
