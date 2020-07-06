import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrDashboardPage } from './qr-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: QrDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrDashboardPageRoutingModule {}
