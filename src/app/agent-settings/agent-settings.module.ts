import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgentSettingsPageRoutingModule } from './agent-settings-routing.module';
import { AgentSettingsPage } from './agent-settings.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentSettingsPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [AgentSettingsPage]
})
export class AgentSettingsPageModule {}
