import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransactionSummaryPageRoutingModule } from './transaction-summary-routing.module';
import { TransactionSummaryPage } from './transaction-summary.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionSummaryPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [TransactionSummaryPage]
})
export class TransactionSummaryPageModule {}
