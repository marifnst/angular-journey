import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  providers:[]
})
export class PagesComponent {

  menu = MENU_ITEMS;  
  receivedMessages: string[] = [];

  constructor(private rxStompService: RxStompService) {
    const message = "Message From Angular";
    console.log(">>>> message : " + message);
    this.rxStompService.publish({destination: '/topic/exportNotification', body: message});
  }

  ngOnInit() {
    this.rxStompService.watch('/topic/exportNotification').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
      console.log(">>>> message : " + message.body);
    });
  }
}
