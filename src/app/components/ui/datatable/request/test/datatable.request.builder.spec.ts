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
import { AutoCompleteSrcConfig } from '../../../autosuggest/src';

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

  it( 'should propagate method', function () {
    // for now it is only has sense to propagate filters
    const requestBuilderWithFieldTypes = new DatatableRequestBuilder();
    const autocompConf1 = new AutoCompleteSrcConfig(
      () => ['data'],
      1,
      25,
      '',
      '',
      'static',
      true,
      );
    const autocompConf2 = new AutoCompleteSrcConfig( () => ['data'] );
    requestBuilderWithFieldTypes.setFilter(new RequestBuilder([
      new FilterRequestField('field1', 'val1', FilterRequestField.MATCH_GREATER_EQUAL, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('field2', 'val2', FilterRequestField.MATCH_EQ, FilterRequestField.TYPE_DATE_RANGE),
      new FilterRequestField(
        'field3',
        'val3',
        FilterRequestField.MATCH_EQ,
        FilterRequestField.TYPE_SELECT,
        autocompConf1,
      ),
      new FilterRequestField('field4', 'val4', FilterRequestField.MATCH_EQ, FilterRequestField.TYPE_TEXT),
      new FilterRequestField(
        'field5',
        'val5',
        FilterRequestField.MATCH_EQ,
        FilterRequestField.TYPE_SELECT,
        autocompConf2,
      ),
    ]));

    const requestBuilderWithData = new DatatableRequestBuilder();
    requestBuilderWithData.setFilter(
      new RequestBuilder([
        new FilterRequestField('field1', 'newVal1'),
        new FilterRequestField('field2', 'newVal2'),
        new FilterRequestField('field3', 'n1,n2,n3'),
        new FilterRequestField('field5', 'n1,n2,n5'),
      ]),
    );

    requestBuilderWithData.propagate(requestBuilderWithFieldTypes);

    const frf1 = <FilterRequestField>requestBuilderWithData.getFilter().getRequestField('field3');
    const frf2 = <FilterRequestField>requestBuilderWithFieldTypes.getFilter().getRequestField('field3');

    expect(frf1).toEqual(frf2);

    expect(requestBuilderWithData.getFilter().getRequestField('field5'))
      .toEqual(requestBuilderWithFieldTypes.getFilter().getRequestField('field5'));

    expect(frf1.getAutoCompleteConf()).toEqual(frf2.getAutoCompleteConf());
    expect(frf1.getAutoCompleteConf().dataProvider).toEqual(frf2.getAutoCompleteConf().dataProvider);

    expect(requestBuilderWithData.getFilter()).toEqual(new RequestBuilder([
      new FilterRequestField('field1', 'newVal1', FilterRequestField.MATCH_GREATER_EQUAL, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('field2', 'newVal2', FilterRequestField.MATCH_EQ, FilterRequestField.TYPE_DATE_RANGE),
      new FilterRequestField(
        'field3',
        'n1,n2,n3',
        FilterRequestField.MATCH_IN, // replaced because of multiple (only IN allowed)
        FilterRequestField.TYPE_SELECT,
        autocompConf1,
      ),
      new FilterRequestField('field4', 'val4', FilterRequestField.MATCH_EQ, FilterRequestField.TYPE_TEXT),
      new FilterRequestField(
        'field5',
        'n1,n2,n5',
        FilterRequestField.MATCH_EQ, // won't be changed as a result is singular
        FilterRequestField.TYPE_SELECT,
        autocompConf2,
      ),
    ]));
  } );

  it( 'should convert from url with different filter types', function () {
    const requestBuilder = new DatatableRequestBuilder();
    requestBuilder.setFilter(new RequestBuilder([
      new FilterRequestField('field1', 'val1', FilterRequestField.MATCH_GREATER_EQUAL, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('field2', 'val2', FilterRequestField.MATCH_EQ, FilterRequestField.TYPE_DATE_RANGE),
      new FilterRequestField('field3', 'val3', FilterRequestField.MATCH_EQ, FilterRequestField.TYPE_SELECT),
    ]));

    const datatableRequestBuilder = DatatableRequestBuilder.fromUrl('_fl_field1=val1&_fl_field2=val2&_fl_field3=val3');
    datatableRequestBuilder.propagate(requestBuilder);

    expect(datatableRequestBuilder).toEqual(requestBuilder);
  } );
});
