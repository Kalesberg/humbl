import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextOrderDetailsPageRoutingModule } from './text-order-details-routing.module';

import { TextOrderDetailsPage } from './text-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextOrderDetailsPageRoutingModule
  ],
  declarations: [TextOrderDetailsPage]
})
export class TextOrderDetailsPageModule {}
