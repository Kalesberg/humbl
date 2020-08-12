import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveMoneyPageRoutingModule } from './receive-money-routing.module';

import { ReceiveMoneyPage } from './receive-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveMoneyPageRoutingModule
  ],
  declarations: [ReceiveMoneyPage]
})
export class ReceiveMoneyPageModule {}
