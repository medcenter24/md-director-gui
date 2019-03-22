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

import { SearchableServiceInterface } from '../searchable.service.interface';
import { SearchFilter } from '../search.filter';

/**
 * Downloading data from the server only once for the current request, then filtering and other things
 * go on in browser by js
 *
 * So to use this provider we need to be sure that amount of data is edged and small
 */
export class SingleLoadableProvider implements SearchableServiceInterface {

  /**
   * All loaded data
   * @type {any[]}
   */
  private data: Object[] = [];

  /**
   * Allow loading only once
   * @type {boolean}
   */
  private loaded: boolean = false;

  constructor(
    public config: SearchableServiceInterface,
  ) { }

  search(filter: SearchFilter): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!filter || !filter.hasOwnProperty('fields') || !filter.hasOwnProperty('query')) {
        reject('Single Loadable Provider must have [field] and [query] filters parameters');
      }
      if (!this.loaded) {
        this.loadData(filter)
          .then(() => resolve(this.filtering(filter)))
          .catch(error => {
            reject(error);
          });
      } else {
        resolve(this.filtering(filter));
      }
    });
  }

  private loadData(filter: SearchFilter): Promise<any> {
    filter.rows = 0; // to load all data, without paginating
    return this.config.search(filter).then(resp => {
      this.data = resp.data;
      this.loaded = true;
    }).catch(() => {
      this.loaded = false;
    });
  }

  /**
   * Filter data to filtered and for show
   */
  private filtering(filter: SearchFilter): any[] {
    const filtered = [];
    for (const model of this.data) {
      const v2 = `${filter.query}`;
      filter.fields.forEach(field => {
        const v1 = `${model[field]}`;
        if (v1.toLowerCase().indexOf(v2.toLowerCase()) !== -1) {
          filtered.push(model);
        }
      });
    }
    return filtered;
  }
}
