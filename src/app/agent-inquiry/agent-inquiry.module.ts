import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentInquiryPageRoutingModule } from './agent-inquiry-routing.module';

import { AgentInquiryPage } from './agent-inquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentInquiryPageRoutingModule
  ],
  declarations: [AgentInquiryPage]
})
export class AgentInquiryPageModule {}
