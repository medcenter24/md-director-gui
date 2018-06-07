/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchFilter } from '../../../components/core/loadable/search.filter';
import { Injectable } from '@angular/core';

@Injectable()
export class CityProviderMock {
  private data: any = {
    data: [{
      id: 1,
      title: 'value1',
    }, {
      id: 2,
      title: 'value2',
    }, {
      id: 3,
      title: 'value3',
    }],
  };

  search(filter: SearchFilter = null): Promise<any> {
    const filtered = this.data;
    if (filter && filter.first) {
      filtered.data = filtered.data.slice(filter.first, filter.rows);
    }
    return new Promise<any>(resolve => resolve(filtered));
  }
}
