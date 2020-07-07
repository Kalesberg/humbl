import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-standee',
  templateUrl: './qr-standee.page.html',
  styleUrls: ['./qr-standee.page.scss'],
})
export class QrStandeePage implements OnInit {

  public qrForOptions:any =null;
  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public imgSrc: string = "";
  public qrData: string;
  // public visaImg: any;// = "../../assets/visa-logo.png";
  // public mcImg: any;
  // public discoverImg: any;
  // public amexImg: any;
  public cardsImg: any;

  constructor(public router: Router,
    private route: ActivatedRoute,
    public nav: NavController
    ) {
    this.setSource();
    let newqrForOptions = this.route.snapshot.paramMap.get('qroptions');
    this.qrForOptions = JSON.parse(newqrForOptions);
    this.selectedColor =  (this.qrForOptions &&  this.qrForOptions.qrcolor)? '#'+ this.qrForOptions.qrcolor: "#22ade4";
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
          this.imgSrc = this.router.getCurrentNavigation().extras.state.imgSrc;
          this.qrData = this.router.getCurrentNavigation().extras.state.qrData;
        }
      })
   }

  ngOnInit() {
  }

  async setSource(){
    // this.visaImg = await this.imageToBase64('../../assets/visa-logo.png');    
    // this.mcImg = await this.imageToBase64('../../assets/mc.png');
    // this.discoverImg = await this.imageToBase64('../../assets/discover.png');
    // this.amexImg = await this.imageToBase64('../../assets/amex.png');
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
      // var canvas, ctx, dataURL, base64;
      // canvas = document.createElement("canvas");
      // ctx = canvas.getContext("2d");
      // canvas.width = img.width;
      // canvas.height = img.height;
      // ctx.drawImage(img, 0, 0);
      // dataURL = canvas.toDataURL("image/png");
      // base64 = dataURL.replace(/^data:image\/png;base64,/, "");
      // return base64;
  }

  finish(isNew){
    if(isNew){
      this.nav.navigateRoot('qr-dashboard');
    }
    else {
      this.nav.navigateRoot('settings');
    }
  }

  printBarcode(barcodeElement, width){
      // window.print();
      console.log(barcodeElement)
    let mywindow = window.open('', 'PRINT');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('</head><body> <div style="display:flex; height:100%; width: 100%; justify-content: center; align-items: center; flex-direction: column;"> ');
    mywindow.document.write('<div style="display: flex; justify-content: space-between; align-items: center; flex-direction: column; border: 2px solid #9A9B9B; height: auto; min-height: 350px; width: 270px; background-color: ' + this.selectedColor + '; -webkit-print-color-adjust: exact; ">');
    mywindow.document.write('<div style="padding: 10px; width: 100%; display: flex; justify-content: center; align-items: center; line-height: 20px;">');
    if(this.qrForOptions.scan)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff;">Scan.</span>');
    if(this.qrForOptions.pay)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff;">Pay.</span>');
    if(this.qrForOptions.tip)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff;">Tip.</span>');
    if(this.qrForOptions.review)
      mywindow.document.write('<span style="margin: 0px 5px;color: #ffffff;">Review.</span>');
    mywindow.document.write('</div>');
    mywindow.document.write(barcodeElement.innerHTML);
    // mywindow.document.write('<ion-card style="margin: auto; box-shadow: none !important;">');
    // mywindow.document.write('<qrcode [qrdata]="this.qrData" [width]="150" [errorCorrectionLevel]="'+'M'+'" [elementType]="'+'svg'+'" [colorLight]="'+this.lightcolor+'" [colorDark]="'+this.selectedColor+'"></qrcode>');
    // mywindow.document.write('</ion-card>');
    if(this.imgSrc){
      mywindow.document.write('<div>');
      mywindow.document.write('<img style=" margin-top: 10px; width: '+width+'px; height: auto;" src="'+this.imgSrc+'">');
      mywindow.document.write('</div>');
    }    
    mywindow.document.write('<div style="width: 100%; display: flex; justify-content: space-around;">');
    // mywindow.document.write('<img style="margin-top: 10px; width: 22%;" src="'+this.visaImg+'">');
    // mywindow.document.write('<img style="margin-top: 10px; width: 22%;" src="'+this.mcImg+'">');
    // mywindow.document.write('<img style="margin-top: 10px; width: 22%;" src="'+this.discoverImg+'">');
    mywindow.document.write('<img style="margin-top: 10px; width: 100%;" src="'+this.cardsImg+'">');
    mywindow.document.write('</div>');
    mywindow.document.write('</div>');
    // mywindow.document.write(barcodeElement.innerHTML);
    mywindow.document.write('</div></body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
  }

  print(){
    window.print();
   }
   
}
