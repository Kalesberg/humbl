import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentTermsPageRoutingModule } from './agent-terms-routing.module';

import { AgentTermsPage } from './agent-terms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentTermsPageRoutingModule
  ],
  declarations: [AgentTermsPage]
})
export class AgentTermsPageModule {}
