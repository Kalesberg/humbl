import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeMoneyPageRoutingModule } from './exchange-money-routing.module';

import { ExchangeMoneyPage } from './exchange-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeMoneyPageRoutingModule
  ],
  declarations: [ExchangeMoneyPage]
})
export class ExchangeMoneyPageModule {}
