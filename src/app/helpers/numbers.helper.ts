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

export class NumbersHelper {

  static getFixedFloat (num, saveDot = false, toFixed = true): number {
    num = num ? num.replace( /[^\d.,]/g, '') : 0;
    if (!num) {
      num = 0;
    } else {
      num = num.replace(',', '.');
      const lastChar = num.slice(-1);
      num = parseFloat(num);
      if (saveDot && lastChar === '.') {
        num += lastChar;
      }
    }
    if (toFixed) {
      num = Number(num) === num && num % 1 !== 0 ? num.toFixed(2) : num;
    }
    return num;
  }

}
