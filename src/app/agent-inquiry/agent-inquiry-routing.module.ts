import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentInquiryPage } from './agent-inquiry.page';

const routes: Routes = [
  {
    path: '',
    component: AgentInquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentInquiryPageRoutingModule {}
