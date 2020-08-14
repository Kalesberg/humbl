import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayBillsDetailPage } from './pay-bills-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PayBillsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayBillsDetailPageRoutingModule {}
