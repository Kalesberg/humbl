import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveMoneyFormPageRoutingModule } from './receive-money-form-routing.module';

import { ReceiveMoneyFormPage } from './receive-money-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveMoneyFormPageRoutingModule
  ],
  declarations: [ReceiveMoneyFormPage]
})
export class ReceiveMoneyFormPageModule {}
