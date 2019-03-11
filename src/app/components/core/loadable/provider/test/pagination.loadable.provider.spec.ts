/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { PaginationLoadableProvider } from '../pagination.loadable.provider';
import { PaginationDataSample } from './sample/pagination.data.sample';
import { SearchFilter } from '../../search.filter';

describe('Loadable: Pagination Provider', () => {
  let service: PaginationLoadableProvider;
  let conf: PaginationDataSample;

  beforeEach(() => {
    conf = new PaginationDataSample();
    service = new PaginationLoadableProvider(conf);
  });

  it('should find first page with data', function () {
    expect(conf.getNumTry()).toBe(0);
    const filter: SearchFilter = SearchFilter.instance();
    service.search(filter)
      .then(data => expect(data).toEqual({
        data: [{
          id: 1,
          name: 'Peter',
          description: 'doctor',
        }, {
          id: 2,
          name: 'Foster',
          description: 'director',
        }, {
          id: 3,
          name: 'Abigail',
          description: 'user',
        }],
      }))
      .catch(error => expect(error).toBeNull());
    expect(conf.getNumTry()).toBe(1);
  });

  it('should find second page with data', function () {
    expect(conf.getNumTry()).toBe(0);
    const filter: SearchFilter = SearchFilter.instance({
      rows: 1,
      first: 1,
    });
    service.search(filter)
      .then(data => expect(data).toEqual({
        data: [{
          id: 2,
          name: 'Foster',
          description: 'director',
        }],
      }))
      .catch(error => expect(error).toBeNull());
    expect(conf.getNumTry()).toBe(1);
  });
});
