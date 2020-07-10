import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPayPageRoutingModule } from './bill-pay-routing.module';

import { BillPayPage } from './bill-pay.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPayPageRoutingModule,
    TranslateModule
  ],
  declarations: [BillPayPage]
})
export class BillPayPageModule {}
