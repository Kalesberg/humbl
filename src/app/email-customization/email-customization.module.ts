import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailCustomizationPageRoutingModule } from './email-customization-routing.module';

import { EmailCustomizationPage } from './email-customization.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
		ReactiveFormsModule,
    EmailCustomizationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EmailCustomizationPage]
})
export class EmailCustomizationPageModule {}
