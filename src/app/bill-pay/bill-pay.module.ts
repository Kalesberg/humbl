import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPayPageRoutingModule } from './bill-pay-routing.module';

import { BillPayPage } from './bill-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPayPageRoutingModule
  ],
  declarations: [BillPayPage]
})
export class BillPayPageModule {}
