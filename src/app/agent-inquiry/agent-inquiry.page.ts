import { Component, OnInit } from '@angular/core';
import { AppHelperService } from '../services/app-helper.service';

@Component({
  selector: 'app-agent-inquiry',
  templateUrl: './agent-inquiry.page.html',
  styleUrls: ['./agent-inquiry.page.scss'],
})
export class AgentInquiryPage implements OnInit {

  constructor(public appHelperService: AppHelperService) { }

  ngOnInit() {
  }

}
