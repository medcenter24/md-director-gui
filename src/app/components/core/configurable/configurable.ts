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
   * @returns {any}
   */
  static factory(configuration: Object, m: any): any {
    const config = m;
    if (configuration) {
      config.eachProp(prop => config.update(prop, configuration));
    }
    return config;
  }

  /**
   * To generate new Instance for the current class
   *
   * FYI i can't use Configurable instead of any because warning appears that inherited class not Configurable
   * something weird with syntax analyzer
   *
   * @param {Object} config
   * @returns {any}
   */
  static instance(config: Object = {}): any {
    /**
     * @type {any}
     */
    const selfModel: any = new this();
    return this.factory(config, selfModel);
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
