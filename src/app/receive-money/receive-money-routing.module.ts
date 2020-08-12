import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveMoneyPage } from './receive-money.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveMoneyPageRoutingModule {}
