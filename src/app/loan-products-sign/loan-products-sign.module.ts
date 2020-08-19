import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanProductsSignPageRoutingModule } from './loan-products-sign-routing.module';

import { LoanProductsSignPage } from './loan-products-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanProductsSignPageRoutingModule
  ],
  declarations: [LoanProductsSignPage]
})
export class LoanProductsSignPageModule {}
