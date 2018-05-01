/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { ObjectHelper } from '../../../helpers/object.helper';

export abstract class Configurable {

  /**
   *
   * @param {Object} configuration
   * @param {Configurable} m Object
   * @returns {Configurable}
   */
  static factory(configuration: Object, m: any): any {
    const config = m;
    if (configuration) {
      config.eachProp(prop => config.update(prop, configuration));
    }
    return config;
  }

  update(key: string, fromConf: Object) {
    if (fromConf.hasOwnProperty(key)) {
      this[key] = fromConf[key];
    }
  }

  /**
   * apply method to each property
   * @param {Function} f
   */
  private eachProp(f: Function): void {
    ObjectHelper.eachProp(this, f);
  }
}
