import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'nga-pages',
  template: `
      <ba-sidebar></ba-sidebar>
      <ba-page-top></ba-page-top>
      <div class="al-main">
          <div class="al-content">
              <ba-content-top></ba-content-top>
              <router-outlet></router-outlet>
          </div>
      </div>
      <footer class="al-footer clearfix">
          <div class="al-footer-right">
              <div class="copyright">
                  &copy; 2017 MyDoctors24
              </div>
              <img src="/assets/img/medical/medical_120.png" width="120"
                   height="120" alt="{{ 'Medical Company' | translate }}">
          </div>
          <div class="al-footer-main clearfix">
              <ul class="al-share clearfix">
                  <li><i class="socicon socicon-facebook"></i></li>
                  <li><i class="socicon socicon-twitter"></i></li>
                  <li><i class="socicon socicon-google"></i></li>
                  <li><i class="fa fa-youtube-play" style="background-color: #ff3a38;"></i></li>
              </ul>
          </div>
      </footer>
      <ba-back-top position="200"></ba-back-top>
  `,
})
export class PagesComponent implements OnInit {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
