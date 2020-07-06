import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrGenerateInfoPage } from './qr-generate-info.page';

const routes: Routes = [
  {
    path: '',
    component: QrGenerateInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrGenerateInfoPageRoutingModule {}
