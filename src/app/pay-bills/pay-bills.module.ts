import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayBillsPageRoutingModule } from './pay-bills-routing.module';

import { PayBillsPage } from './pay-bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayBillsPageRoutingModule
  ],
  declarations: [PayBillsPage]
})
export class PayBillsPageModule {}
