/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class ObjectHelper {
  /**
   * Duplicates all properties
   *
   * @param {Object} fromModel
   * @param {Object} toModel
   * @returns {Object}
   */
  static clone(fromModel: any, toModel: any): any {
    return ObjectHelper.eachProp(toModel, prop => {
      if (fromModel.hasOwnProperty(prop)) {
        toModel[prop] = fromModel[prop];
      }
    });
  }

  /**
   * Apply method for each property of object
   * @param {Object} o
   * @param {Function} f
   */
  static eachProp(o: Object, f: Function): void {
     for (const prop of Object.keys(o)) {
       f(prop);
     }
  }

  /**
   * Extends an object o with extended object params eo
   * @param o
   * @param eo
   */
  static extend(o: Object, eo: Object): Object {
    // clone
    const obj = {};
    for (const key of Object.keys(o)) {
      obj[key] = o[key];
    }
    // extend
    for (const key of Object.keys(eo)) {
      obj[key] = eo[key];
    }

    return obj;
  }
}
