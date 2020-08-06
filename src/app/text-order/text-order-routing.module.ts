import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextOrderPage } from './text-order.page';

const routes: Routes = [
  {
    path: '',
    component: TextOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextOrderPageRoutingModule {}
