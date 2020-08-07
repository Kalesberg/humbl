import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qr-generate-info',
  templateUrl: './qr-generate-info.page.html',
  styleUrls: ['./qr-generate-info.page.scss'],
})
export class QrGenerateInfoPage implements OnInit {

  public qrForOptions:any =null;
  public selectedColor: string = "#22ade4";
  public iamgeUrl: any = '../../assets/humbl-white.png';
  public pickerWidth = 338;

  constructor(private route: ActivatedRoute,
    public nav: NavController,
    public storage: Storage) { 
    let newqrForOptions = this.route.snapshot.paramMap.get('qroptions');
    this.qrForOptions = JSON.parse(newqrForOptions)
    if(window.innerWidth<340){
      this.pickerWidth = 180;
    }
    else {
      this.pickerWidth = 338;
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    if (window.File && window.FileList && window.FileReader) {
      this.Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
  
  Init(){
    console.log("Upload Initialised");  
      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag'),
          submitButton  = document.getElementById('submit-button');
  
      fileSelect.addEventListener('change', (e)=>{ this.fileSelectHandler(e)}, false);
  
      // Is XHR2 available?
      var xhr = new XMLHttpRequest();
      console.log(fileDrag)
      if (xhr.upload) {
        // File Drop
        fileDrag.addEventListener('dragover',(e)=>{ this.fileDragHover(e)}, false);
        fileDrag.addEventListener('dragleave', (e)=>{ this.fileDragHover(e)}, false);
        fileDrag.addEventListener('drop', (e)=>{ this.fileSelectHandler(e)}, false);
      }
  }
  
  fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
  
      e.stopPropagation();
      e.preventDefault();
  
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }
  
  fileSelectHandler(e) {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;
    console.log(files)
      // Cancel event and hover styling
      this.fileDragHover(e);
  
      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        this.parseFile(f);
        this.uploadFile(f);
      }
    }
    
  async parseFile(file) {

      var imageName = file.name;
  
      var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('notimage').classList.add("hidden");
        // Thumbnail Preview
        document.getElementById('file-image').classList.remove("hidden");
        this.iamgeUrl = await this.toBase64(file);
       (<any>document.getElementById('file-image')).src = this.iamgeUrl;
      }
      else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        (<any>document.getElementById("file-upload-form")).reset();
      }
    }
  
  uploadFile(file) {
  
      var xhr = new XMLHttpRequest(),
        fileSizeLimit = 1024; // In MB
      if (xhr.upload) {
        // Check if file is less than x MB
        // if (file.size <= fileSizeLimit * 1024 * 1024) {  
          // Start upload
          xhr.open('POST', (<any>document.getElementById('file-upload-form')).action, true);
          xhr.setRequestHeader('X-File-Name', file.name);
          xhr.setRequestHeader('X-File-Size', file.size);
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          xhr.send(file);
        // } 
      }
    } 

    handleChangeComplete(ev){
      this.selectedColor = ev.color.hex;
    }

    async next(status){
      this.qrForOptions.qrcolor = status ? this.selectedColor : '';
      let barcodeData = {
        imgSrc: status? this.iamgeUrl: '',
        qroptions: this.qrForOptions
      }
      await this.storage.set('barcodestandee',barcodeData);
      this.nav.navigateForward('/merchant/qr');
    }

  toBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

    back(){
      this.nav.back();
    }
}
