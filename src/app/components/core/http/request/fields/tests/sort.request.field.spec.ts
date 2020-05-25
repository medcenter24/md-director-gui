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

import { SortRequestField } from '../sort.request.field';

describe('Service: Request sort field', () => {

  it( 'should be correct toUrl', () => {
    expect((new SortRequestField('f1', 'none')).toUrl()).toEqual('');
    expect((new SortRequestField('f1', 'desc')).toUrl()).toEqual('_sr_f1=desc');
    expect((new SortRequestField('f1', 'asc')).toUrl()).toEqual('_sr_f1=asc');
    expect((new SortRequestField('f1', 'wrong_string')).toUrl()).toEqual('');
    expect((new SortRequestField('f 1', 'asc')).toUrl()).toEqual('_sr_f%201=asc');
    expect((new SortRequestField('f&1', 'asc')).toUrl()).toEqual('_sr_f%261=asc');
    expect((new SortRequestField('f?1', 'asc')).toUrl()).toEqual('_sr_f%3F1=asc');
    expect((new SortRequestField('spec_()*&^%$#@@!"\':;}{[]', 'asc')).toUrl())
      .toEqual('_sr_spec_()*%26%5E%25%24%23%40%40!%22\'%3A%3B%7D%7B%5B%5D=asc');
  } );

  it( 'should move further', function () {
    expect(new SortRequestField('a', 'none').moveNext().toUrl()).toEqual('_sr_a=asc');
    expect(new SortRequestField('a', 'asc').moveNext().toUrl()).toEqual('_sr_a=desc');
    expect(new SortRequestField('a', 'desc').moveNext().toUrl()).toEqual('');
    expect(new SortRequestField('a', 'a').moveNext().toUrl()).toEqual('_sr_a=asc');
  } );
});
