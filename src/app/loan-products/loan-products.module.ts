import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanProductsPageRoutingModule } from './loan-products-routing.module';

import { LoanProductsPage } from './loan-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanProductsPageRoutingModule
  ],
  declarations: [LoanProductsPage]
})
export class LoanProductsPageModule {}
