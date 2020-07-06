import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrStandeePage } from './qr-standee.page';

const routes: Routes = [
  {
    path: '',
    component: QrStandeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrStandeePageRoutingModule {}
