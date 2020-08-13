import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayableBillsPage } from './payable-bills.page';

const routes: Routes = [
  {
    path: '',
    component: PayableBillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayableBillsPageRoutingModule {}
