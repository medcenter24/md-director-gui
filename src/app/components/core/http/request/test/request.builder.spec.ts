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

import { RequestBuilder } from '../request.builder';
import { RequestField } from '../request.field';

describe('Request builder test', () => {

  let requestBuilder: RequestBuilder;

  beforeEach(() => {
    requestBuilder = new RequestBuilder();
    // to make them active
    requestBuilder.setValue('a', 'b');
    requestBuilder.setValue('c', 'd');
    requestBuilder.setValue('e f', ' g h ');
    requestBuilder.setValue('c!&#', 'd?#');
    requestBuilder.setValue('cde', '');
  });

  it( 'should convert to URL', () => {
    expect(requestBuilder.toUrl())
      .toEqual('a=b&c=d&e%20f=%20g%20h%20&c!%26%23=d%3F%23');
  });

  it( 'should convert from URL', () => {
    const rB = RequestBuilder.fromUrl('a=b&c=d&e%20f=%20g%20h%20&c!%26%23=d%3F%23&cde=');
    expect(rB).toEqual(requestBuilder);
    expect(rB.toUrl).toEqual(requestBuilder.toUrl);
  });

  it( 'should return RequestField entity', () => {
    expect(requestBuilder.getRequestField('a')).toEqual(new RequestField('a', 'b'));
    expect(requestBuilder.getRequestField('field_12')).toEqual(null);
  } );

  it( 'should check hasField', () => {
    expect(requestBuilder.hasField('a')).toEqual(true);
    expect(requestBuilder.hasField('field_12')).toEqual(false);
  } );
});
