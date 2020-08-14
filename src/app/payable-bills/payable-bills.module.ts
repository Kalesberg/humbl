import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayableBillsPageRoutingModule } from './payable-bills-routing.module';
import { PayableBillsPage } from './payable-bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayableBillsPageRoutingModule
  ],
  declarations: [PayableBillsPage]
})
export class PayableBillsPageModule {}
