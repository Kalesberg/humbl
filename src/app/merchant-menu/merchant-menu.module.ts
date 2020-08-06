import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MerchantMenuPageRoutingModule } from './merchant-menu-routing.module';
import { MerchantMenuPage } from './merchant-menu.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantMenuPageRoutingModule,
    TranslateModule
  ],
  declarations: [MerchantMenuPage]
})
export class MerchantMenuPageModule {}
