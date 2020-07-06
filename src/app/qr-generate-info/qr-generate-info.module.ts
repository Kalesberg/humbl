import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrGenerateInfoPageRoutingModule } from './qr-generate-info-routing.module';
import { QrGenerateInfoPage } from './qr-generate-info.page';
import { ColorSketchModule } from 'ngx-color/sketch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrGenerateInfoPageRoutingModule,
    ColorSketchModule
  ],
  declarations: [QrGenerateInfoPage]
})
export class QrGenerateInfoPageModule {}
