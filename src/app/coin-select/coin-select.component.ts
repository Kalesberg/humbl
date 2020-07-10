import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-coin-select',
  templateUrl: './coin-select.component.html',
  styleUrls: ['./coin-select.component.scss'],
})
export class CoinSelectComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
    private translate : TranslateService) { }

  ngOnInit() {
  }

  selectCoin(coin: string){
    console.log(coin);
    this.modalCtrl.dismiss(coin);
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
