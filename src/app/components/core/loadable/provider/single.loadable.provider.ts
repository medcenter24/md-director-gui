/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
