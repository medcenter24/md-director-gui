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
