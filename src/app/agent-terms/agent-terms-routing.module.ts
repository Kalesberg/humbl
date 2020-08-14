import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentTermsPage } from './agent-terms.page';

const routes: Routes = [
  {
    path: '',
    component: AgentTermsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentTermsPageRoutingModule {}
