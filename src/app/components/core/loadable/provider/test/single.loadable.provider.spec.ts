/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { SingleLoadableProvider } from '../single.loadable.provider';
import { SingleDataSample } from './sample/single.data.sample';
import { SearchFilter } from '../../search.filter';

describe('Loadable: Single Provider', () => {
  let service: SingleLoadableProvider;
  let conf: SingleDataSample;

  beforeEach(() => {
    conf = new SingleDataSample();
    service = new SingleLoadableProvider(conf);
  });

  it('checkSearch', () => {
    expect(conf.getNumTry()).toBe(0);
    const filter: SearchFilter = SearchFilter.instance({
      fields: ['id'],
      query: '123',
    });
    service.search(filter)
      .then(data => expect(data).toEqual([]) )
      .catch(() => expect().nothing());
    expect(conf.getNumTry()).toBe(1);
  });

  it('checkException', () => {
    expect(conf.getNumTry()).toBe(0);
    const filter = SearchFilter.instance();
    service.search(filter)
      .then(data => expect(data).toEqual([]))
      .catch(msg => expect(msg).toBe('Single Loadable Provider must have [field] and [query] filters parameters'));
    expect(conf.getNumTry()).toBe(1);
  });

  it ('checkFiltering', done => {
    const filter = SearchFilter.instance({
      fields: ['id'],
      query: 1,
    });
    service.search(filter)
      .then(data => {
        expect(data).toEqual([{
          id: 1,
          name: 'Peter',
          description: 'doctor',
        }]);
        done();
      })
      .catch(msg => {
        expect(msg).toBeNull();
        done();
      });
  });

  it ('single provider returns all filtered data without pagination', done => {
    const filter = SearchFilter.instance({
      fields: ['id'],
      query: '',
      rows: 1,
    });
    service.search(filter)
      .then(data => {
        expect(data).toEqual([{
          id: 1,
          name: 'Peter',
          description: 'doctor',
        }, {
          id: 2,
          name: 'Foster',
          description: 'director',
        }]);
        done();
      })
      .catch(msg => {
        expect(msg).toBeNull();
        done();
      });
  });
});
