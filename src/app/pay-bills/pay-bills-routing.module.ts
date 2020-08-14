import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayBillsPage } from './pay-bills.page';

const routes: Routes = [
  {
    path: '',
    component: PayBillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayBillsPageRoutingModule {}
