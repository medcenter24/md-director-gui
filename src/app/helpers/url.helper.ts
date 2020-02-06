/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
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

export class UrlHelper {

  static replaceOrAdd (location: string, name: string, value: string): string {
    try {
      const regEx = new RegExp(`${name}=[^&]+`);
      const newVal = value === '' ? '' : `${name}=${value}`;

      if (location.includes(`${name}=`)) {
        location = location.replace(regEx, newVal);
      } else {
        let separator = location.includes('?') ? '&' : '?';
        separator = newVal === '' ? '' : separator;
        location = location + separator + newVal;
      }
    } catch (e) {
      // something wend wrong, return that was received
    }
    // clean a garbage that could be generated here
    return UrlHelper.cleanUrl(location);
  }

  static cleanUrl(location): string {

    // replace duplicated &&
    location = location.replace(/&+/g, '&');

    // delete ?& at the and of string
    location = location.replace(/\?&/, '?');
    location = location.replace(/^[?&]|[?&]$/, '');

    return location;
  }

  static get(location: string, name: string, def: any): string {
    let res = def;
    const regEx = `[?&]${encodeURIComponent(name)}=([^&]*)`;
    const query = new RegExp(regEx).exec(location);
    if (query) {
      res = decodeURIComponent(query[1]);
    }
    return res;
  }

  static eachQueryVariable(location: string, func: Function): void {
    const parts = location.split('?');
    let varParts = location;
    if (parts.length > 1) {
      varParts = parts[1];
    }
    const vars = varParts.split( '&' );
    vars.forEach(value => {
      const val = value.split('=');
      let valMe = '';
      let valName = '';
      if (val.length > 1) {
        valName = decodeURIComponent(val[0]);
        valMe = decodeURIComponent(val[1]);
      } else {
        valName = decodeURIComponent(value);
      }

      func(valName, valMe);
    });
  }

  static getQueryVariables(location: string): Object[] {

    const res = [];
    UrlHelper.eachQueryVariable(location, (name: string, val: string) => {
      const obj = {};
      obj[name] = val;
      res.push(obj);
    });
    return res;
  }

  static getQueryVarsAsObject(location: string): Object {
    const res = {};
    UrlHelper.eachQueryVariable(location, (name: string, val: string) => {
      res[name] = val;
    });
    return res;
  }
}
