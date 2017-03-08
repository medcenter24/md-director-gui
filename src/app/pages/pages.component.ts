import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { MENU } from '../app.menu';

@Component({
  selector: 'pages',
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <ng2-slim-loading-bar [color]="'#209e91'"></ng2-slim-loading-bar>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created for <i class="fa fa-heartbeat"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="https://mydoctor24.com">MyDoctor24.com</a> 2017</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-youtube"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService,) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>MENU);
  }
}
