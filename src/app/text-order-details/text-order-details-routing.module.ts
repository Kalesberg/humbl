import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextOrderDetailsPage } from './text-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: TextOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextOrderDetailsPageRoutingModule {}
