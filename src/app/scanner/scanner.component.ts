import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from "rxjs/operators";
import { ModalController } from '@ionic/angular';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: any;
  guestExist: boolean;

  constructor(public modalCtrl: ModalController,
    private translate : TranslateService) {}

  ngOnInit(): void {}

  //Clears the QR code scanned
  // clearResult(): void {
  //   this.qrResult = null;
  // }

  //Scans the QR code
  onCodeResult(result: string): void {
    if (result) {
      this.modalCtrl.dismiss(result);
    }
  }

  //Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  close(){
    this.modalCtrl.dismiss();
  }
  
  doSomething(): void {
    console.log(this.scanner.device) //= this.getBackCamera();
  }
 
  /**
   * Returns the back camera for ya.
   */
  // getBackCamera() {
  //   return theBackCamera;
  // }

}
