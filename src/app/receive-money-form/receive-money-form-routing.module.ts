import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveMoneyFormPage } from './receive-money-form.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveMoneyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveMoneyFormPageRoutingModule {}
