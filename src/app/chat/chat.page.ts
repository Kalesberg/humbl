import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild("scrollDiv") scrollDiv: any;
  @ViewChild("messageInput") messageInput: any;

  public chatMessages: any[]=[{
    fromUserId:"1",
    toUserId:"2",
    message:"We will bring it to you outside in 20 minutes for pickup. Please text us when you get here.",
    photoUrl:"",
    chatDate:"20 June 2020 1:30 PM"
  },{
    fromUserId:"1",
    toUserId:"2",
    message:"Thank you, your order is #357. Please click here to pay.",
    photoUrl:"",
    chatDate:"20 June 2020 1:30 PM"
  },{
    fromUserId:"2",
    toUserId:"1",
    message:"Two beef tacos, one chicken taco and two jarritos.",
    photoUrl:"",
    chatDate:"20 June 2020 1:30 PM"
  },{
    fromUserId:"1",
    toUserId:"2",
    message:"Hi Shawna, what can we get for you?",
    photoUrl:"",
    chatDate:"20 June 2020 1:30 PM"
  },{
    fromUserId:"2",
    toUserId:"1",
    message:"Hey! I got stuck with the lunch run today.",
    photoUrl:"",
    chatDate:"20 June 2020 1:30 PM"
  }];
  public fromUserId: string = "1";
  public toUserId: string = "2";
  public fromUserName: string = "Mission Taco";
  public toUserName: string = "Shawna C.";
  public fromUserImage: string = "../../../assets/gallery/ixb3sh0thWI-unsplash@2x.png";
  public toUserImage: string = "../../../assets/gallery/les-anderson-ixb3sh0thWI-unsplash@2x.png";
  public chatUsers: any[];
  public message = '';
  
  constructor() {}

  ngOnInit() { }

}
