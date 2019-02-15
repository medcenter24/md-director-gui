/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SelectorConfig } from '../selector.config';

describe('Config: SelectorConfig', () => {
  it('should be defined with dataProvider parameter', () => {
    try {
      SelectorConfig.instance();
    } catch (e) {
      expect(e.message).toEqual('This type of configuration require this parameters to be filled: dataProvider');
    }
  });
});
