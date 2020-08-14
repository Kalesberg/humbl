import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeMoneyPage } from './exchange-money.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangeMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeMoneyPageRoutingModule {}
