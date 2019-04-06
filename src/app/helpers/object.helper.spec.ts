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
