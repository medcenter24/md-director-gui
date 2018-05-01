/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { SimpleConfig } from './samples/simple.config';

describe('Model: Configurable', () => {
  it('should return true', function () {
    expect().nothing();
  });

  it('simple config', function () {
    const config = SimpleConfig.factory({
      prop1: 1,
    }, new SimpleConfig());
    expect(config['prop1']).toBe(1, 'prop1 needs to be 1');
    expect(config['prop']).toBeUndefined('prop has not been initialized in SimpleConfig');
  });
});
