/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchableServiceInterface } from '../searchable.service.interface';

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

  search(filters: Object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!filters || !filters.hasOwnProperty('field') || !filters.hasOwnProperty('query')) {
        reject('Single Loadable Provider must have [field] and [query] filters parameters');
      }
      if (!this.loaded) {
        this.loadData(filters)
          .then(() => resolve(this.filtering(filters)))
          .catch(error => {
            reject(error);
          });
      } else {
        resolve(this.filtering(filters));
      }
    });
  }

  private loadData(filters: Object): Promise<any> {
    return this.config.search(filters).then(resp => {
      this.data = resp.data;
      this.loaded = true;
    }).catch(() => {
      this.loaded = false;
    });
  }

  /**
   * Filter data to filtered and for show
   */
  private filtering(filters: any): any[] {
    const filtered = [];
    for (const model of this.data) {
      const v1 = `${model[filters.field]}`;
      const v2 = `${filters.query}`;
      if (v1.toLowerCase().indexOf(v2.toLowerCase()) !== -1) {
        filtered.push(model);
      }
    }
    return filtered;
  }
}
