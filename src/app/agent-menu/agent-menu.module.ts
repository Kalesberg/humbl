import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgentMenuPageRoutingModule } from './agent-menu-routing.module';
import { AgentMenuPage } from './agent-menu.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentMenuPageRoutingModule,
    TranslateModule
  ],
  declarations: [AgentMenuPage]
})
export class AgentMenuPageModule {}
