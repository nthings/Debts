import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <nb-layout center="center-column" windowMode>
      <nb-layout-header fixed>
        <ngx-header position="normal"></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
        tag="menu-sidebar"
        responsive
        end="end">
        <nb-menu [items]="menu"></nb-menu>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
