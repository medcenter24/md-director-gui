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

import { DatatableRequestBuilder } from '../datatable.request.builder';
import { RequestBuilder } from '../../../../core/http/request';
import {
  FilterRequestField,
  PaginationLimitRequestField, PaginationOffsetRequestField,
  SortRequestField,
} from '../../../../core/http/request/fields';

describe('Datatable request builder test', () => {

  it( 'should convert to URL', function () {
    const requestBuilder = new DatatableRequestBuilder();
    expect(requestBuilder.toUrl()).toEqual('');
  } );

  it( 'should convert paginator 1', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setPaginator(new RequestBuilder([
      new PaginationLimitRequestField(),
      new PaginationOffsetRequestField(),
    ]));
    expect(requestBuilder.toUrl()).toEqual('');
  } );

  it( 'should convert paginator 2', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setPaginator(new RequestBuilder([
      new PaginationLimitRequestField('1'),
      new PaginationOffsetRequestField('10'),
    ]));
    expect(requestBuilder.toUrl()).toEqual('_pnl_limit=1&_pno_offset=10');
  } );

  it( 'should convert filters', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setFilter(new RequestBuilder([
      new FilterRequestField('field1', 'val1'),
      new FilterRequestField('field2', 'val2'),
      new FilterRequestField('field3', 'val3'),
    ]));
    expect(requestBuilder.toUrl()).toEqual('_fl_field1=val1&_fl_field2=val2&_fl_field3=val3');
  } );

  it( 'should convert sort', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setSorter(new RequestBuilder([
      new SortRequestField('field1', 'asc'),
      new SortRequestField('field2', 'desc'),
      new SortRequestField('field3', 'none'),
    ]));
    expect(requestBuilder.toUrl()).toEqual('_sr_field1=asc&_sr_field2=desc');
  } );

  it( 'should convert toUrl', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setPaginator(new RequestBuilder([
      new PaginationLimitRequestField('1'),
      new PaginationOffsetRequestField('10'),
    ]));
    requestBuilder.setFilter(new RequestBuilder([
      new FilterRequestField('field1', 'val1'),
      new FilterRequestField('field2', 'val2'),
      new FilterRequestField('field3', 'val3'),
    ]));
    requestBuilder.setSorter(new RequestBuilder([
      new SortRequestField('field1', 'asc'),
      new SortRequestField('field2', 'desc'),
      new SortRequestField('field3', 'none'),
    ]));
    expect(requestBuilder.toUrl())
      .toEqual('_sr_field1=asc&_sr_field2=desc&_fl_field1=val1&_fl_field2=val2&_fl_field3=val3&_pnl_limit=1&_pno_offset=10');
  } );

  it( 'should convert from url', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setPaginator(new RequestBuilder([
      new PaginationLimitRequestField('1'),
      new PaginationOffsetRequestField('10'),
    ]));
    requestBuilder.setFilter(new RequestBuilder([
      new FilterRequestField('field1', 'val1'),
      new FilterRequestField('field2', 'val2'),
      new FilterRequestField('field3', 'val3'),
    ]));
    requestBuilder.setSorter(new RequestBuilder([
      new SortRequestField('field1', 'asc'),
      new SortRequestField('field2', 'desc'),
    ]));

    const datatableRequestBuilder = DatatableRequestBuilder.fromUrl('_sr_field1=asc&_sr_field2=desc&_fl_field1=val1&_fl_field2=val2&_fl_field3=val3&_pnl_limit=1&_pno_offset=10');

    expect(datatableRequestBuilder).toEqual(requestBuilder);
  } );
});
