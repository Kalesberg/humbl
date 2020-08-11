import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as dayjs from 'dayjs';
import { ChatMessage } from '../../model/chatMessage';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent implements OnInit {

  @Input() chatMessage: any;
  @Input() fromUserId: string;
  @Input() fromUserImg: string;
  @Input() toUserImg: string;
  @Input() fromUserName: string;
  @Input() toUserName: string;

  constructor() { }

  ngOnInit() {
  }

  // displayChatMessageDate() {
  //   var zone_name = moment.tz.guess();
  //   return dayjs(dayjs(this.chatMessage.time / 1000).toDate()
  //     .toLocaleString("en-US", { timeZone: zone_name }))
  //     .format('DD MMM YY, hh:mm A');
  // }
}
