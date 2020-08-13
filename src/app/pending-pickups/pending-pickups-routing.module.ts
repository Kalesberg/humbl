import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingPickupsPage } from './pending-pickups.page';

const routes: Routes = [
  {
    path: '',
    component: PendingPickupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingPickupsPageRoutingModule {}
