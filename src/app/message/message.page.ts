import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { ActionSheetController, AlertController, LoadingController, ModalController, IonContent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { SettingsService } from '../services/settings.service';
import { ImageService } from '../services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImagemodalPage } from '../imagemodal/imagemodal.page'
import { map } from 'rxjs/operators';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Keyboard, Camera } = Plugins;

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  @ViewChild(IonContent, null) contentArea: IonContent;
  userId: any;
  userType: any;
  title: any;
  message: any;
  conversationId: any;
  messages: any;
  updateDateTime: any;
  messagesToShow: any;
  startIndex: any = -1;
  // Set number of messages to show.
  numberOfMessages = 10;
  loggedInUserId: any;
  public loading: any;
  conversations_ob: any;

  loggedInUserAvatar: any;
  loggedInUserName: any;
  userAvatar: any;
  userName: any;

  // MessagePage
  // This is the page where the user can chat with a friend.
  constructor(
    // public navCtrl: NavController,
    // public navParams: NavParams,
    private router: Router,
    private route: ActivatedRoute,
    public angularfire: AngularFirestore,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public imageProvider: ImageService,
    public modalCtrl: ModalController,
    public actionSheet: ActionSheetController,
    public contacts: Contacts,
    public settings: SettingsService,
    public geolocation: Geolocation
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.user;
        this.userType = this.router.getCurrentNavigation().extras.state.userType;
        this.settings
          .getUserProfile(this.userId)
          .get()
          .then( userProfileSnapshot => {
            this.userAvatar = userProfileSnapshot.data().profileUrl;
            this.userName = userProfileSnapshot.data().businessName || ((userProfileSnapshot.data().firstname || "") + " " + (userProfileSnapshot.data().lastname || ""));
          });
      }
    });
    this.conversations_ob = this.angularfire.collection('conversations').snapshotChanges().pipe(map(actions => actions.map(a => {
      const data : any = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    })));
   }

  ngOnInit() {
    this.conversations_ob.subscribe(data => {
      if(this.conversationId) {
        let messages = data.filter(val => {
          return val.id === this.conversationId
        })[0].messages;
        this.messages = messages;
        this.messagesToShow = messages;
      } else {
        firebase.firestore().doc('businessProfile/'+this.loggedInUserId+'/conversations/'+this.userId).get().then(doc => {
          if(doc.exists) {
            let conversations = doc.data().conversations;
            this.conversationId = conversations[conversations.length - 1].conversationId;
            let messages = data.filter(val => {
              return val.id === this.conversationId
            })[0].messages;
            this.messages = messages;
            this.messagesToShow = messages;
          }
        });
      }
    });  
    this.scrollBottom();
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {

    this.loggedInUserId = firebase.auth().currentUser.uid;
    console.log(this.userId);

    this.settings
      .getBusinessProfile()
      .get()
      .then( userProfileSnapshot => {
        this.loggedInUserAvatar = userProfileSnapshot.data().profileUrl;
        this.loggedInUserName = userProfileSnapshot.data().businessName || ((userProfileSnapshot.data().firstname || "") + " " + (userProfileSnapshot.data().lastname || ""));
      });
    console.log(this.userId);

    // Get conversationInfo with friend.
    firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).get().then((doc: any) => {
      if (doc.exists) {
        // User already have conversation with this friend, get conversation
        const conversations_array = doc.data().conversations;
        this.conversationId = conversations_array[conversations_array.length - 1].conversationId;
        console.log(this.conversationId);
        this.messagesToShow = [];
        firebase.firestore().doc('/conversations/' + this.conversationId).get().then(doc => {
          this.messagesToShow = doc.data().messages;
          this.messages = doc.data().messages;
        })
      }
    });

    // Update messages' date time elapsed every minute based on Moment.js.
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function () {
        if (that.messages) {
          that.messages.forEach((message) => {
            let date = message.date;
            message.date = new Date(date);
          });
        }
      }, 60000);
    }

    // this.scrollBottom();
  }
  // Load previous messages in relation to numberOfMessages.
  loadPreviousMessages() {
    let that = this;
    // Show loading.
    this.loadingController.create({ spinner: 'circles', duration: 2000 }).then(res => {
      this.loading = res;
      this.loading.present();
    })
    setTimeout(function () {
      // Set startIndex to load more messages.
      if ((that.startIndex - that.numberOfMessages) > -1) {
        that.startIndex -= that.numberOfMessages;
      } else {
        that.startIndex = 0;
      }
      // Refresh our messages list.
      that.messages = null;
      that.messagesToShow = null;

      that.scrollTop();

      // Populate list again.
      that.ionViewDidEnter();
    }, 1000);
  }

  // Update messagesRead when user lefts this page.
  ionViewWillLeave() {
    this.setMessagesRead();
  }

  // Check if currentPage is active, then update user's messagesRead.
  setMessagesRead() {
    firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).get().then(snap => {
      console.log(snap.data());
      if (snap.exists) {
        let conversations = snap.data().conversations;
        let conversation_index = conversations.findIndex(element => {
          return element.conversationId === this.conversationId;
        })
        console.log(conversations, this.conversationId, conversation_index);
        conversations[conversation_index].messageRead = 1;
        firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).update('conversations', conversations);
      }
    });
  }

  scrollBottom() {
    console.log("Calling Sb")
    setTimeout(() => {
      if (this.contentArea.scrollToBottom) {
        this.contentArea.scrollToBottom();
      }
    }, 500);
    this.setMessagesRead();
  }

  scrollTop() {
    console.log("Calling St")
    setTimeout(() => {
      if (this.contentArea.scrollToTop) {
        this.contentArea.scrollToTop();
      }
    }, 500);
  }


  // Check if the user is the sender of the message.
  isSender(message) {
    if (message.sender == this.loggedInUserId) {
      return true;
    } else {
      return false;
    }
  }

  selectEmoji(event){
    if(this.message){
      this.message += event.emoji.native;
    }else{
      this.message = event.emoji.native;
    }
  }


  // Send message, if there's no conversation yet, create a new conversation.
  send(type: any) {
    if (this.message) {
      // User entered a text on messagebox
      if (this.conversationId) {
        let messages = this.messages;
        messages.push({
          date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "T" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
          sender: this.loggedInUserId,
          type: type,
          message: this.message
        });

        firebase.firestore().doc('/conversations/'+this.conversationId).update('messages', messages).then((success) => {
          this.message = '';
          // Add conversation reference to the users.
          firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).get().then(snapshot => {
            if(snapshot.exists) {
              let conversations = snapshot.data().conversations;
              let conversation_index = conversations.findIndex(element => {
                return element.conversationId === this.conversationId;
              })
              conversations[conversation_index].messageRead = 1;
              firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).update("conversations", conversations);
            } else {
              firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).set({conversations : [{conversationId: this.conversationId, messageRead: 1}]});
            }
          })
          firebase.firestore().doc('/userProfile/' + this.userId + '/conversations/' + this.loggedInUserId).get().then(snapshot => {
            if(snapshot.exists) {
              let conversations = snapshot.data().conversations;
              let conversation_index = conversations.findIndex(element => {
                return element.conversationId === this.conversationId;
              })
              conversations[conversation_index].messageRead = 0;
              firebase.firestore().doc('/userProfile/' + this.userId + '/conversations/' + this.loggedInUserId).update("conversations", conversations);
            } else {
              firebase.firestore().doc('/userProfile/' + this.userId + '/conversations/' + this.loggedInUserId).set({conversations : [{conversationId: this.conversationId, messageRead: 0}]});
            }
          })
        });

        // Clear messagebox.
        this.message = '';
        this.scrollBottom();
      } else {
        console.log("else")
        // New Conversation with friend.
        let messages = [];
        messages.push({
          date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "T" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
          sender: this.loggedInUserId,
          type: type,
          message: this.message
        });
        this.messages = messages;
        this.messagesToShow = messages;
        var users = [];
        users.push(this.loggedInUserId);
        users.push(this.userId);
        // Add conversation.
        firebase.firestore().collection('conversations').add({
          dateCreated: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "T" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
          messages: messages,
          users: users
        }).then((success) => {
          this.conversationId = success.id;
          this.message = ''; let userDB = '';
          // Add conversation reference to the users.
          firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).get().then(snapshot => {
            if(snapshot.exists) {
              firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).update("conversations", firebase.firestore.FieldValue.arrayUnion({conversationId: this.conversationId, messageRead: 1}));
            } else {
              firebase.firestore().doc('/businessProfile/' + this.loggedInUserId + '/conversations/' + this.userId).set({conversations : [{conversationId: this.conversationId, messageRead: 1}]});
            }
          })
          firebase.firestore().doc('/userProfile/' + this.userId + '/conversations/' + this.loggedInUserId).get().then(snapshot => {
            if(snapshot.exists) {
              firebase.firestore().doc('/userProfile/' + this.userId + '/conversations/' + this.loggedInUserId).update("conversations", firebase.firestore.FieldValue.arrayUnion({conversationId: this.conversationId, messageRead: 0}));
            } else {
              firebase.firestore().doc('/userProfile/' + this.userId + '/conversations/' + this.loggedInUserId).set({conversations : [{conversationId: this.conversationId, messageRead: 0}]});
            }
          })
        });
        this.scrollBottom();
      }
    }
  }

  viewUser(userId) {
    this.router.navigateByUrl('userinfo/' + userId);
  }


  attach() {
    this.actionSheet.create({
      header: 'Choose attachments',
      buttons: [{
        text: 'Camera',
        handler: () => {
          this.imageProvider.uploadPhotoMessage(this.conversationId, CameraSource.Camera).then((url) => {
            this.message = url;
            this.send("image");
          });
        }
      }, {
        text: 'Photo Library',
        handler: () => {
          this.imageProvider.uploadPhotoMessage(this.conversationId, CameraSource.Photos).then((url) => {
            this.message = url;
            this.send("image");
          });
        }
      },
      {
        text: 'Video',
        handler: () => {
          this.imageProvider.uploadVideoMessage(this.conversationId).then(url => {
            this.message = url;
            this.send("video");
          });
        }
      }
        , {
        text: 'Location',
        handler: () => {
          this.geolocation.getCurrentPosition({
            timeout: 5000
          }).then(res => {
            let locationMessage = "Location:<br> lat:" + res.coords.latitude + "<br> lng:" + res.coords.longitude;
            let mapUrl = "<a href='https://www.google.com/maps/search/" + res.coords.latitude + "," + res.coords.longitude + "'>View on Map</a>";

            let confirm = this.alertCtrl.create({
              header: 'Your Location',
              message: locationMessage,
              buttons: [{
                text: 'cancel',
                handler: () => {
                  console.log("canceled");
                }
              }, {
                text: 'Share',
                handler: () => {
                  this.message = locationMessage + "<br>" + mapUrl;
                  this.send("location");
                }
              }]
            }).then(r => r.present());
          }, locationErr => {
            console.log("Location Error" + JSON.stringify(locationErr));
          });
        }
      }, {
        text: 'Contact',
        handler: () => {
          this.contacts.pickContact().then(data => {
            let name;
            if (data.displayName !== null) name = data.displayName;
            else name = data.name.givenName + " " + data.name.familyName;
            this.message = "<b>Name:</b> " + name + "<br><b>Mobile:</b> <a href='tel:" + data.phoneNumbers[0].value + "'>" + data.phoneNumbers[0].value + "</a>";
            this.send("contact");
          }, err => {
            console.log(err);
          })
        }
      }, {
        text: 'cancel',
        role: 'cancel',
        handler: () => {
          console.log("cancelled");
        }
      }]
    }).then(r => r.present());
  }

  // Enlarge image messages.
  enlargeImage(img) {
    this.modalCtrl.create({
      component: ImagemodalPage,
      componentProps: {
        img: img
      }
    }).then(res => {
      res.present();
    })
    // let imageModal = this.modalCtrl.create(ImageModalPage, { img: img });
    // imageModal.present();
  }

  back() {
    this.router.navigateByUrl('messages');
  }


}
