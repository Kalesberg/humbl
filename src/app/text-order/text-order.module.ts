import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextOrderPageRoutingModule } from './text-order-routing.module';

import { TextOrderPage } from './text-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextOrderPageRoutingModule
  ],
  declarations: [TextOrderPage]
})
export class TextOrderPageModule {}
