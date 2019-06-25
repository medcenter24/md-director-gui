/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
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
import { GlobalState } from '../../../global.state';
import { BaToolboxAction } from './baToolbox.action';

@Component({
  selector: 'nga-toolbox-component',
  templateUrl: './baToolbox.html',
  styleUrls: ['./baToolbox.scss'],
})
export class BaToolboxComponent implements OnInit {
  actions: {} = {};
  groups: string[] = [];

  constructor(
    private _state: GlobalState,
  ) {
    _state.subscribe('routerMove', direction => {
      if (direction === 'NavigationStart') {
        this.actions = {};
        this.groups = [];
      }
    });
  }

  ngOnInit(): void {
    this._state.subscribe('toolbox.actions', (actions: BaToolboxAction[]) => {
      this.actions = {};
      this.groups = [];

      for (const action of actions) {
        let id = this.groups.indexOf(action.group);
        if (id === -1) {
          this.groups.push(action.group);
          id = this.groups.indexOf(action.group);
        }
        if (! (id in this.actions) ) {
          this.actions[id] = [];
        }
        this.actions[id].push(action);
      }
    });
  }
}
