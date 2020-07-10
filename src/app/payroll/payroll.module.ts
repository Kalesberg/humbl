import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollPageRoutingModule } from './payroll-routing.module';

import { PayrollPage } from './payroll.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollPageRoutingModule,
    TranslateModule
  ],
  declarations: [PayrollPage]
})
export class PayrollPageModule {}
