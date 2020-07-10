import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TxDetailPageRoutingModule } from './tx-detail-routing.module';

import { TxDetailPage } from './tx-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TxDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [TxDetailPage]
})
export class TxDetailPageModule {}
