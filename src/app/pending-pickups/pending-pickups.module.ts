import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingPickupsPageRoutingModule } from './pending-pickups-routing.module';

import { PendingPickupsPage } from './pending-pickups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingPickupsPageRoutingModule
  ],
  declarations: [PendingPickupsPage]
})
export class PendingPickupsPageModule {}
