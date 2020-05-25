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
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { RequestField } from '../request.field';
import { RequestTestDataProvider } from './request.test.data.provider';

describe('Service: UI Sort', () => {

  const dataProviders: RequestTestDataProvider[] = [
    new RequestTestDataProvider('f1', 'none', 'f1=none' ),
    new RequestTestDataProvider('f1', 'asc', 'f1=asc' ),
    new RequestTestDataProvider('f1', 'desc', 'f1=desc' ),
    new RequestTestDataProvider('f1', 'wrong_string', 'f1=wrong_string' ),
    new RequestTestDataProvider('f 1', 'none', 'f%201=none' ),
    new RequestTestDataProvider('f&1', 'none', 'f%261=none' ),
    new RequestTestDataProvider('f?1', 'none', 'f%3F1=none' ),
    new RequestTestDataProvider('spec_()*&^%$#@@!"\':;}{[]', 'none',
      'spec_()*%26%5E%25%24%23%40%40!%22\'%3A%3B%7D%7B%5B%5D=none' ),
  ];

  it( 'should be correct toUrl', () => {
    dataProviders.forEach((d: RequestTestDataProvider) => {
      expect(new RequestField(d.title, d.value).toUrl()).toEqual(d.expected);
    });
  } );
});
