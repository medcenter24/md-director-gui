import { Component } from '@angular/core';

import { BaMsgCenterService } from './baMsgCenter.service';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  notifications: Object[];
  messages: Object[];

  showNotifications: boolean = false;
  showMessages: boolean = false;

  constructor(private _baMsgCenterService: BaMsgCenterService) {
    this.notifications = this._baMsgCenterService.getNotifications();
    this.messages = this._baMsgCenterService.getMessages();
  }

  toggleNotifications(): boolean {
    this.showMessages = false;
    this.showNotifications = !this.showNotifications;
    return false;
  }

  toggleMessages(): boolean {
    this.showNotifications = false;
    this.showMessages = !this.showMessages;
    return false;
  }

}
