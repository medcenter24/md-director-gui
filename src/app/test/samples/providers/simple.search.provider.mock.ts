/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchableServiceInterface } from '../../../components/core/loadable';
import { SearchFilter } from '../../../components/core/loadable/search.filter';

export class SimpleSearchProviderMock implements SearchableServiceInterface {

  private data: any = {
    data: [{
      id: 1,
      value: 'value1',
    }, {
      id: 2,
      value: 'value2',
    }, {
      id: 3,
      value: 'value3',
    }],
  };

  search(filter: SearchFilter = null): Promise<any> {
    const filtered = this.data;
    if (filter && filter.first) {
      filtered.data = filtered.slice(filter.first, filter.rows);
    }
    return new Promise<any>(resolve => resolve(filtered));
  }
}
