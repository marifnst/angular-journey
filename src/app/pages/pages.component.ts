import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { GeneralService } from '../@core/utils';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  providers:[GeneralService]
})
export class PagesComponent {

  menu = MENU_ITEMS;
  /*menu = [];

  constructor(generalService:GeneralService) {
    // console.log('PagesRoutingModule : ' + this.menu.length);
    if (this.menu.length == 0) {
      generalService.getMenu().then(resp => {
        this.menu = resp;
      });
    }
  }*/
}
