import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrDashboardPageRoutingModule } from './qr-dashboard-routing.module';

import { QrDashboardPage } from './qr-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrDashboardPageRoutingModule
  ],
  declarations: [QrDashboardPage]
})
export class QrDashboardPageModule {}
