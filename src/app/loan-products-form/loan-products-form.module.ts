import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanProductsFormPageRoutingModule } from './loan-products-form-routing.module';

import { LoanProductsFormPage } from './loan-products-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanProductsFormPageRoutingModule
  ],
  declarations: [LoanProductsFormPage]
})
export class LoanProductsFormPageModule {}
