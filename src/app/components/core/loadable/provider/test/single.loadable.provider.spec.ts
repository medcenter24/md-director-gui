/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { SingleLoadableProvider } from '../single.loadable.provider';
import { SingleDataSample } from './sample/single.data.sample';

describe('Loadable: Single Provider', () => {
  let service: SingleLoadableProvider;
  let conf: SingleDataSample;

  beforeEach(() => {
    conf = new SingleDataSample();
    service = new SingleLoadableProvider(conf);
  });

  it('checkSearch', () => {
    expect(conf.getNumTry()).toBe(0);
    service.search({
      field: 'id',
      query: '123',
    })
      .then(data => expect(data).toEqual([]) )
      .catch(() => expect().nothing());
    expect(conf.getNumTry()).toBe(1);
  });

  it('checkException', () => {
    expect(conf.getNumTry()).toBe(0);
    service.search({})
      .then(data => expect(data).toEqual([{}]))
      .catch(msg => expect(msg).toBe('Single Loadable Provider must have [field] and [query] filters parameters'));
    expect(conf.getNumTry()).toBe(1);
  });

  it ('checkFiltering', () => {
    service.search({
      field: 'id',
      query: 1,
    })
      .then(data => expect(data).toEqual([{
        id: 1,
        name: 'Peter',
        description: 'doctor',
      }]))
      .catch(msg => expect(msg).toBeNull());
  });
});
