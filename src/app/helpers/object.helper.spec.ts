/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { ObjectHelper } from './object.helper';

describe('Helper: ObjectHelper', () => {
  it('eachProp', function () {
    const obj = {
      prop1: '1',
      prop2: '2',
      prop3: '3',
    };

    let npp = 1;
    ObjectHelper.eachProp(obj, p => {
      expect(p).toBe(`prop${npp}`);
      npp++;
    });
  });
  it('clone', function () {

    const objFrom = {
      p: 'not copied',
      p1: 'value1',
      p3: 'value3',
    };
    const toObj = {
      p1: '',
      p2: '',
      p3: '',
    };
    ObjectHelper.clone(objFrom, toObj);
    expect(toObj).toEqual({
      p1: 'value1',
      p2: '',
      p3: 'value3',
    });
  });
});
