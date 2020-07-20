import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Keyboard, Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public loading: any;
  private profilePhotoOptions: any = {
    quality: 50,
    targetWidth: 384,
    targetHeight: 384,
    destinationType: CameraResultType.DataUrl,
    correctOrientation: true
  };

  private photoMessageOptions: any = {
    quality: 50,
    destinationType: CameraResultType.DataUrl,
    correctOrientation: true,
    allowEdit: true
  };

  private groupPhotoOptions: any = {
    quality: 50,
    targetWidth: 384,
    targetHeight: 384,
    destinationType: CameraResultType.DataUrl,
    correctOrientation: true
  };


  constructor(
    public angularfire: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public mediaCapture: MediaCapture,
    public file: File) {
    console.log("Initializing Image Provider");
  }

  // Function to convert dataURI to Blob needed by Firebase
  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }

  // Generate a random filename of length for the image to be uploaded
  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }

  // Set ProfilePhoto given the user and the cameraSourceType.
  // This function processes the imageURI returned and uploads the file on Firebase,
  // Finally the user data on the database is updated.
  showLoadingCtrl() {
    this.loadingCtrl.create({ spinner: 'circles', duration: 2000 }).then(res => {
      this.loading = res;
      this.loading.present();
    })
  }

  hideLoadingCtrl() {
    this.loading.dismiss();
  }

  async presentToast(message = this.translate.instant("data")) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 1000,
      color: 'dark',
    });
    toast.present();
  }

  setProfilePhoto(user, sourceType) {
    console.log(user);
    this.profilePhotoOptions.sourceType = sourceType;
    this.showLoadingCtrl();
    // Get picture from camera or gallery.
    Camera.getPhoto(this.profilePhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      let name = this.generateFilename();
      let dpStorageRef = firebase.storage().ref().child('images/' + user.userId + '/' + name);
      // Generate filename and upload to Firebase Storage.
      dpStorageRef.put(imgBlob, metadata).then((snapshot) => {
        // Delete previous profile photo on Storage if it exists.
        // this.deleteImageFile(user.img);
        // URL of the uploaded image!
        console.log(snapshot);


        dpStorageRef.getDownloadURL().then(res => {
          console.log(res);
          let url = res;

          let profile = {
            displayName: user.name,
            photoURL: url
          };
          // Update Firebase User.
          firebase.auth().currentUser.updateProfile(profile)
            .then((success) => {
              // Update User Data on Database.
              this.angularfire.object('/accounts/' + user.userId).update({
                img: url
              }).then((success) => {
                this.hideLoadingCtrl();
                this.presentToast("Profile Updated");
              }).catch((error) => {
                console.log(error);
                this.hideLoadingCtrl();
                this.presentToast("Something went wrong");
              });
            })
            .catch((error) => {
              console.log(error);
              this.hideLoadingCtrl();
              this.presentToast("Something went wrong");
          });

        });



      }).catch((error) => {
        console.log(error);
        this.hideLoadingCtrl();
        this.presentToast("Something went wrong");
      });
    }).catch((error) => {
      this.hideLoadingCtrl();
    });
  }

  // Upload and set the group object's image.
  setGroupPhoto(group, sourceType) {
    this.groupPhotoOptions.sourceType = sourceType;
    this.showLoadingCtrl();
    // Get picture from camera or gallery.
    Camera.getPhoto(this.groupPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let metadata = {
        'contentType': imgBlob.type
      };

      let name = this.generateFilename();
      let groupStorageRef = firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + name);
      groupStorageRef.put(imgBlob, metadata).then((snapshot) => {
        // this.deleteImageFile(group.img);
        // URL of the uploaded image!
        groupStorageRef.getDownloadURL().then(url => {
          group.img = url;
          this.hideLoadingCtrl();
        })

      }).catch((error) => {
        this.hideLoadingCtrl();
        this.presentToast("Something went wrong");
      });
    }).catch((error) => {
      this.hideLoadingCtrl();
    });
  }

  // Set group photo and return the group object as promise.
  setGroupPhotoPromise(group, sourceType): Promise<any> {
    return new Promise(resolve => {
      this.groupPhotoOptions.sourceType = sourceType;
      this.showLoadingCtrl();
      // Get picture from camera or gallery.
      Camera.getPhoto(this.groupPhotoOptions).then((imageData) => {
        // Process the returned imageURI.
        let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
        let metadata = {
          'contentType': imgBlob.type
        };
        let gPPStorageRef = firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + this.generateFilename());
        gPPStorageRef.put(imgBlob, metadata).then((snapshot) => {
          this.deleteImageFile(group.img);
          // URL of the uploaded image!
          gPPStorageRef.getDownloadURL().then(url => {
            group.img = url;
            this.hideLoadingCtrl();
            resolve(group);
          })

        }).catch((error) => {
          this.hideLoadingCtrl();
          this.presentToast("Something went wrong");
          });
      }).catch((error) => {
        this.hideLoadingCtrl();
      });
    });
  }

  //Delete the image given the url.
  deleteImageFile(path) {
    var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + fileName).delete().then(() => { }).catch((error) => { console.log(error) });
  }

  //Delete the user.img given the user.
  deleteUserImageFile(user) {
    var fileName = user.img.substring(user.img.lastIndexOf('%2F') + 3, user.img.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + user.userId + '/' + fileName).delete().then(() => { }).catch((error) => { console.log(error) });
  }

  // Delete group image file on group storage reference.
  deleteGroupImageFile(groupId, path) {
    var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + groupId + '/' + fileName).delete().then(() => { }).catch((error) => { console.log(error) });
  }

  // Upload photo message and return the url as promise.
  uploadPhotoMessage(conversationId, sourceType): Promise<any> {
    return new Promise(resolve => {
      this.photoMessageOptions.sourceType = sourceType;
      this.showLoadingCtrl();
      // Get picture from camera or gallery.
      Camera.getPhoto(this.photoMessageOptions).then((imageData) => {
        // Process the returned imageURI.
        let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
        let metadata = {
          'contentType': imgBlob.type
        };
        // Generate filename and upload to Firebase Storage.
        let upRef = firebase.storage().ref().child('images/' + conversationId + '/' + this.generateFilename());
        upRef.put(imgBlob, metadata).then((snapshot) => {
          // URL of the uploaded image!
          upRef.getDownloadURL().then(url => {
            this.hideLoadingCtrl();
            resolve(url);
          })

        }).catch((error) => {
          this.hideLoadingCtrl();
          this.presentToast("Something went wrong");
        });
      }).catch((error) => {
        this.hideLoadingCtrl();
      });
    });
  }

  // Upload group photo message and return a promise as url.
  uploadGroupPhotoMessage(groupId, sourceType): Promise<any> {
    return new Promise(resolve => {
      this.photoMessageOptions.sourceType = sourceType;
      this.showLoadingCtrl();
      // Get picture from camera or gallery.
      Camera.getPhoto(this.photoMessageOptions).then((imageData) => {
        // Process the returned imageURI.
        let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
        let metadata = {
          'contentType': imgBlob.type
        };
        // Generate filename and upload to Firebase Storage.
        let ugpRef = firebase.storage().ref().child('images/' + groupId + '/' + this.generateFilename());
        ugpRef.put(imgBlob, metadata).then((snapshot) => {
          // URL of the uploaded image!
          ugpRef.getDownloadURL().then(url => {
            this.hideLoadingCtrl();
            resolve(url);
          })

        }).catch((error) => {
          this.hideLoadingCtrl();
          this.presentToast("Something went wrong");
        });
      }).catch((error) => {
        this.hideLoadingCtrl();
      });
    });
  }
  uploadGroupVideoMessage(groupId): Promise<any> {
    return new Promise(resolve => {
      this.showLoadingCtrl();
      this.mediaCapture.captureVideo().then(data => {
        let videoUrl = data[0].fullPath;
        console.log("video path: " + videoUrl);
        let x = videoUrl.split("/");
        let filepath = videoUrl.substring(0, videoUrl.lastIndexOf("/"));
        let name = x[x.length - 1];
        console.log(filepath + " - " + name);
        this.file.readAsArrayBuffer(filepath, name).then(success => {
          console.log(success);
          let blob = new Blob([success], { type: "video/mp4" });
          console.log(blob);
          let upload = firebase.storage().ref().child('videos/' + groupId + "/" + name).put(blob);
          upload.then(res => {
            let process = res.bytesTransferred / res.totalBytes * 100;
            console.log(process);
            this.hideLoadingCtrl();
    
            resolve(res.downloadURL);
          }, err => {
            this.hideLoadingCtrl();
            console.log("Failed")
          });

        });
      }, err => {
        this.hideLoadingCtrl();
        console.log("Media Err = " + err);
      });
    });
  }

  uploadVideoMessage(conversationId): Promise<any> {
    return new Promise(resolve => {
      this.showLoadingCtrl();
      this.mediaCapture.captureVideo().then(data => {
        let videoUrl = data[0].fullPath;
        console.log("video path: " + videoUrl);
        let x = videoUrl.split("/");
        let filepath = videoUrl.substring(0, videoUrl.lastIndexOf("/"));
        let name = x[x.length - 1];
        console.log(filepath + " - " + name);
        this.file.readAsArrayBuffer(filepath, name).then(success => {
          console.log(success);
          let blob = new Blob([success], { type: "video/mp4" });
          console.log(blob);
          // let timestamp = (Math.floor(Date.now() / 1000)).toString();

          let uploadRef = firebase.storage().ref().child('videos/' + name);
          uploadRef.put(blob).then(res => {
            let process = res.bytesTransferred / res.totalBytes * 100;
            console.log(process);
            this.hideLoadingCtrl();
            uploadRef.getDownloadURL().then(url => {
              resolve(url);
            })

          }, err => {
            this.hideLoadingCtrl();
            console.log("Failed")
          });
        });
      }, err => {
        this.hideLoadingCtrl();
        console.log("Media Err = " + err);
      });
    });
  }
}
