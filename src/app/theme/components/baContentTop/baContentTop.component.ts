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

import { Component } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'nga-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTopComponent {

  activePageTitle: string = '';
  breadcrumbs: Breadcrumb[] = [];
  translate: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        if (!Array.isArray(activeLink)) {
          this.activePageTitle = activeLink.title;
        } else {
          this.breadcrumbs = activeLink;
          const active = this.breadcrumbs.find((b: Breadcrumb) => b.active);
          if (active) {
            this.activePageTitle = active.title;
            this.translate = active.translate;
          }
        }
      }
    });
  }
}
