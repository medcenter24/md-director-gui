/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { environment } from '../../environments/environment';

@Component({
  selector: 'nga-pages',
  template: `
      <ba-sidebar></ba-sidebar>
      <nga-ba-page-top></nga-ba-page-top>
      <div class="al-main">
          <nga-toolbox-component></nga-toolbox-component>
          <div class="al-content">
              <nga-content-top></nga-content-top>
              <router-outlet></router-outlet>
          </div>
      </div>
      <footer class="al-footer clearfix">
          <div class="al-footer-right">
              <div class="copyright">
                  &copy; {{ year }} {{ projectName }}
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

  projectName: string = '';
  year: number;

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    this.year = new Date().getFullYear();
    this.projectName = environment.projectName;
  }
}
