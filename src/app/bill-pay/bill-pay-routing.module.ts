import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillPayPage } from './bill-pay.page';

const routes: Routes = [
  {
    path: '',
    component: BillPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPayPageRoutingModule {}
