/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
  static extend(o: Object = null, eo: Object = null): Object {
    o = o || {};
    eo = eo || {};
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
