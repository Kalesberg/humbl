import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailCustomizationPage } from './email-customization.page';

const routes: Routes = [
  {
    path: '',
    component: EmailCustomizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailCustomizationPageRoutingModule {}
