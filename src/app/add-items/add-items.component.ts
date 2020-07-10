import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ItemsService } from '../services/items.service';
import { mobiscroll, MbscNumpadDecimalOptions } from '@mobiscroll/angular';
import { TranslateService } from '@ngx-translate/core';
mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light'
};

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  price: number;
  description: string;
  public setItems = [];
  searchTerm: string = '';
  searching: any = false;
  numpadSettings:  MbscNumpadDecimalOptions;

  constructor(private itemsService: ItemsService, public navCtrl: NavController, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public storage: Storage, public toast: ToastController,
    private translate : TranslateService) {
      this.storage.get('userSet').then((data) => {
        if(data != null){
        this.setItems = data;
        }
      });
      
      this.numpadSettings = {
        preset: 'decimal',
        min: 0,
        max: 5000,
        prefix: '$'
    };
  }

  ngOnInit() {
  
  }

  setFilteredItems() {
    this.setItems = this.itemsService.filterItems(this.searchTerm);
    this.itemsService.load();
  }

  saveItem(){
    if(!this.description){
      this.description = 'item';
    }
    let newItem = {
      price: +this.price,
      description: this.description.toLowerCase()
    };
    this.modalCtrl.dismiss(newItem);
  }

  saveFromUserDefined(item){
    this.modalCtrl.dismiss(item);
  }

  deleteItem(item) {
    this.setItems.splice(this.setItems.indexOf(item), 1);
    this.storage.set('userSet', this.setItems);
  }
  
  async editItem(item){
    let prompt = await this.alertCtrl.create({
        header: this.translate.instant("items.edit"),
        inputs: [
          {
            name: 'description',
            placeholder: this.translate.instant("items.editholder")
          },
          {
            name: 'price',
            placeholder: this.translate.instant("items.item")
          },
        ],
        buttons: [
            {
              text: this.translate.instant("items.cancel")
            },
            {
              text: this.translate.instant("settings.save"),
              handler: data => {
                  let index = this.setItems.indexOf(item);
                  if(index > -1){
                    console.log(data.price);
                    if(!data.description){
                      this.fieldsWarning();
                    } else {
                      this.setItems[index].price = +data.price;
                      this.setItems[index].description = data.description;
                      this.storage.set('userSet', this.setItems);
                      this.presentToast();
                    }
                  }
              }
            }
        ]
    });
    return await prompt.present();      
  } 
 
  close(){
    this.modalCtrl.dismiss();
  }

  storeUserDefined() {
    this.setItems.push({
      price: +this.price,
      description: this.description.toLowerCase(),
    });
    this.storage.set('userSet', this.setItems);
    this.presentToast();
    this.itemsService.load();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: this.translate.instant("items.saved"),
      position: 'middle',
      color: 'dark',
      duration: 1500
    });
    toast.present();
  }

  // Present Notifications
  async fieldsWarning() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant("items.warn"),
      subHeader: this.translate.instant("items.warnsub"),
      message:this.translate.instant("items.message"),
      buttons: [this.translate.instant("register.ok")]
    });

    await alert.present();
  }

}
