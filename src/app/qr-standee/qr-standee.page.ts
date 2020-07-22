import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qr-standee',
  templateUrl: './qr-standee.page.html',
  styleUrls: ['./qr-standee.page.scss'],
})
export class QrStandeePage implements OnInit {

  public qrForOptions:any =null;
  public selectedColor: string = "";
  public lightcolor: string = "#ffffff";
  public imgSrc: string = '../../assets/humbl-white.png';
  public qrData: string;
  public cardsImg: any;

  constructor(public router: Router,
    private route: ActivatedRoute,
    public nav: NavController,
    public storage: Storage) {
    this.getLocalData();
    this.setSource();
    // let newqrForOptions = this.route.snapshot.paramMap.get('qroptions');
    // this.qrForOptions = JSON.parse(newqrForOptions);
    // this.selectedColor =  (this.qrForOptions &&  this.qrForOptions.qrcolor)? '#'+ this.qrForOptions.qrcolor: "#22ade4";
    // this.route.queryParams.subscribe(async (params) => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //       this.imgSrc = this.router.getCurrentNavigation().extras.state.imgSrc;
    //       this.qrData = this.router.getCurrentNavigation().extras.state.qrData;
    //     }
    //   })
   }

  ngOnInit() {
  }
  async getLocalData(){
    let qrLocalData= await this.storage.get('barcodestandee');
    console.log(qrLocalData)
    this.imgSrc = qrLocalData.imgSrc ? qrLocalData.imgSrc : '../../assets/humbl-white.png';
    this.qrData = qrLocalData.qrData;
    this.qrForOptions = qrLocalData.qroptions;
    console.log((this.qrForOptions && this.qrForOptions.qrcolor) ? this.qrForOptions.qrcolor : "#22ade4")
    this.selectedColor =  (this.qrForOptions && this.qrForOptions.qrcolor) ? this.qrForOptions.qrcolor : "#22ade4";
  }

  async setSource(){
    this.cardsImg = await this.imageToBase64('../../assets/cards-logo.png');
  }

  imageToBase64(imgPath) {   
    return new Promise((resolve,reject)=>{
      var canvas, ctx, dataURL, base64;
      let img = document.createElement('img');
      img.src = imgPath;
      img.onload = ()=> {
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL('image/png');
        // base64 =  dataURL.replace(/^data:image\/png;base64,/, "");
        resolve(dataURL);
        canvas = null;
      };
      img.onerror = ((err)=>{ resolve("") });
    })
  }

  async finish(isNew){
    if(isNew){
      await this.storage.set('barcodestandee',"" );
      this.nav.navigateRoot('qr-dashboard');
    }
    else {
      this.nav.navigateRoot('pos');
    }
  }

  printBarcode(barcodeElement, height: any, width: any){
    let mywindow = window.open('', 'PRINT');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('</head><body> <div style="display:block; height:'+height+'px; width:'+width+'px; margin:auto;"> ');
    mywindow.document.write('<div style="display: flex; justify-content: space-between; align-items: center; flex-direction: column; border-radius: 5px; height:'+height+'px; width:'+width+'px; background-color: ' + this.selectedColor + '; -webkit-print-color-adjust: exact; ">');
    if(this.imgSrc){
      mywindow.document.write('<div>');
      mywindow.document.write('<img style="margin-top: 30px; margin-bottom: 30px; max-width: 200px;" src="'+this.imgSrc+'">');
      mywindow.document.write('</div>');
    }
    mywindow.document.write('<div style="display: block; margin: auto; height: 200px; width:200px; padding: 10px; border-radius: 10px; background-color: #ffffff;">');    
    mywindow.document.write(barcodeElement.innerHTML);
    mywindow.document.write('</div>');
    mywindow.document.write('<div style="margin-top:30px; width: 100%; display: flex; justify-content: center; align-items: center; line-height: 20px;">');
    if(this.qrForOptions.scan)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff; font-size:30px; font-weight:700;">Scan.</span>');
    if(this.qrForOptions.pay)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff; font-size:30px; font-weight:700;">Pay.</span>');
    if(this.qrForOptions.tip)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff; font-size:30px; font-weight:700;">Tip.</span>');
    if(this.qrForOptions.review)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff; font-size:30px; font-weight:700;">Review.</span>');
    mywindow.document.write('</div>');
    mywindow.document.write('<div>');
    mywindow.document.write('<img style="display: block; margin: auto; margin-top: 50px; width: 500px;" src="'+this.cardsImg+'">');
    mywindow.document.write('</div>');
    mywindow.document.write('</div>');
    mywindow.document.write('</div></body></html>');
    mywindow.document.body.setAttribute('style', 'font-family:"Roboto", "Helvetica Neue", sans-serif !important');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
  }

  print(){
    window.print();
   }
   
}
