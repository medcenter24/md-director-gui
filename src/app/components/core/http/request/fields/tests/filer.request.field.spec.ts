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

import { FilterRequestField } from '../filter.request.field';

class DataProvider {
  constructor (
    public title: string = '',
    public value: string = '',
    public expected: string = '',
  ) {
  }
}

describe('Service: Filter Request Field', () => {

  const dataProviders: DataProvider[] = [
    new DataProvider('f1', 'none', '_fl_f1=none' ),
    new DataProvider('f1', 'asc', '_fl_f1=asc' ),
    new DataProvider('f1', 'desc', '_fl_f1=desc' ),
    new DataProvider('f 1', 'none', '_fl_f%201=none' ),
    new DataProvider('f&1', 'none', '_fl_f%261=none' ),
    new DataProvider('f?1', 'none', '_fl_f%3F1=none' ),
    new DataProvider('spec_()*&^%$#@@!"\':;}{[]', 'none',
      '_fl_spec_()*%26%5E%25%24%23%40%40!%22\'%3A%3B%7D%7B%5B%5D=none' ),
    new DataProvider('dateRange', '2018-10-03 05:44:39<>2019-11-12 04:03:01', '_fl_dateRange=2018-10-03%2005%3A44%3A39%3C%3E2019-11-12%2004%3A03%3A01'),
  ];

  it( 'should be correct toUrl', () => {
    dataProviders.forEach((d: DataProvider) => {
      expect(new FilterRequestField(d.title, d.value).toUrl()).toEqual(d.expected);
    });
  } );

  it( 'should return correct match', () => {
    const exp = ['eq', 'like', 'like%', 'gt', 'lt'];
    exp.forEach((op: string) => {
      expect(new FilterRequestField('a', 'b', op).getMatch())
        .toEqual(op, `Operate not found ${op}`);
    });
    expect(new FilterRequestField('a', 'b', 'a').getMatch())
      .toEqual('eq', 'Incorrect op converted to eq');
    expect(new FilterRequestField('a', 'b').getMatch())
      .toEqual('eq', 'Default always eq');
  } );
});
