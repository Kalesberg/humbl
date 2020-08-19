import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.scss'],
})
export class SelectOptionsComponent implements OnInit {

  @Input() options: any[];
  @Input() title: string;
  @Input() seletedItem: string;


  constructor(private modalCtrl: ModalController ) { }

  ngOnInit() {}

  selected(item){
    this.modalCtrl.dismiss(item,"change")
  }
  
}
