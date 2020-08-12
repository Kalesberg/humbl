import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-settings',
  templateUrl: './agent-settings.page.html',
  styleUrls: ['./agent-settings.page.scss'],
})
export class AgentSettingsPage implements OnInit {
  
  public selectedColor: string = "#22ade4";
  public lightcolor: string = "#ffffff";
  public qrData: string ="test qrdata"

  constructor() { }

  ngOnInit() {
  }

}
