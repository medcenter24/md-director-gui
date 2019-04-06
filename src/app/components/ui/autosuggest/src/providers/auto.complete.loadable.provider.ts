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

import { AutoCompleteProvider } from './auto.complete.provider';
import { AutoCompleteSrcConfig } from '../auto.complete.src.config';

/**
 * Loads only limit count of rows and for each request going to the server
 */
export class AutoCompleteLoadableProvider implements AutoCompleteProvider {

  /**
   * Data to show in the selector
   * @type {any[]}
   */
  filtered: Object[] = [];

  /**
   * Chosen data
   */
  selected: Object|Object[];

  constructor (private config: AutoCompleteSrcConfig) {}

  /**
   * Load Data
   * @param event
   */
  loadData(event): Promise<any> {
    return this.config.dataProvider({ q: event });
  }

  filter(event): void {
    this.loadData(event).then(data => this.filtered = data);
  }

  /**
   * Select new selection
   * @param {any} items
   */
  selectItems(items: any): void {
    this.selected = items;
  }
}
