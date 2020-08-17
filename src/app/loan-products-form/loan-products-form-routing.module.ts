import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanProductsFormPage } from './loan-products-form.page';

const routes: Routes = [
  {
    path: '',
    component: LoanProductsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanProductsFormPageRoutingModule {}
