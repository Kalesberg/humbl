import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSummaryPage } from './transaction-summary.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSummaryPageRoutingModule {}
