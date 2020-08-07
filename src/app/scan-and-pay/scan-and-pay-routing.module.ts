import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanAndPayPage } from './scan-and-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ScanAndPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanAndPayPageRoutingModule {}
