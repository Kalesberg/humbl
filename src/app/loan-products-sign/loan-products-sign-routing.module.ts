import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanProductsSignPage } from './loan-products-sign.page';

const routes: Routes = [
  {
    path: '',
    component: LoanProductsSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanProductsSignPageRoutingModule {}
