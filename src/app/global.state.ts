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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalState {

  private _data = new BehaviorSubject<Object>([]);
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Function[]> = new Map<string, Function[]>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {

    const current = this._data[event];
    if (current !== value) {
      this._data[event] = value;

      this._data.next({
        event,
        data: this._data[event],
      });
    }
  }

  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
