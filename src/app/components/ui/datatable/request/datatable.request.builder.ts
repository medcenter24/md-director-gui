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

import { RequestBuilder } from '../../../core/http/request';
import { UrlHelper } from '../../../../helpers/url.helper';
import { ObjectHelper } from '../../../../helpers/object.helper';
import {
  FilterRequestField,
  PaginationLimitRequestField,
  PaginationOffsetRequestField,
  SortRequestField,
} from '../../../core/http/request/fields';

export class DatatableRequestBuilder {
  constructor (
    public sorter: RequestBuilder = new RequestBuilder(),
    public filter: RequestBuilder = new RequestBuilder(),
    public paginator: RequestBuilder = new RequestBuilder([
      new PaginationOffsetRequestField(),
      new PaginationLimitRequestField(),
    ]),
  ) {
  }

  getPaginator(): RequestBuilder {
    return this.paginator;
  }

  setPaginator(builder: RequestBuilder): void {
    this.paginator = builder;
  }

  getFilter(): RequestBuilder {
    return this.filter;
  }

  setFilter(builder: RequestBuilder): void {
    this.filter = builder;
  }

  getSorter(): RequestBuilder {
    return this.sorter;
  }

  setSorter(builder: RequestBuilder): void {
    this.sorter = builder;
  }

  toUrl(): string {
    const stack = [];
    Object.keys(this).forEach((key) => {
      if (this[key] && this[key].toUrl()) {
        stack.push(this[key].toUrl());
      }
    });
    return stack.join('&');
  }

  static fromUrl(url: string): DatatableRequestBuilder {
    const requestBuilder = new DatatableRequestBuilder();

    const sorters = [];
    const filters = [];
    let paginators = [];

    UrlHelper.getQueryVariables(url).forEach(obj => {
      ObjectHelper.eachProp(obj, key => {
        if (obj[key] && obj[key] !== 'null') {
          if (key.startsWith( SortRequestField.FIELD_PREFIX )) {
            const k = key.replace( SortRequestField.FIELD_PREFIX, '' );
            sorters.push( new SortRequestField( k, obj[ key ] ) );
          } else if (key.startsWith( FilterRequestField.FIELD_PREFIX )) {
            const k = key.replace( FilterRequestField.FIELD_PREFIX, '' );
            filters.push( new FilterRequestField( k, obj[ key ] ) );
          } else if (key.startsWith( PaginationLimitRequestField.FIELD_PREFIX )) {
            paginators.push( new PaginationLimitRequestField( obj[ key ] ) );
          } else if (key.startsWith( PaginationOffsetRequestField.FIELD_PREFIX )) {
            paginators.push( new PaginationOffsetRequestField( obj[ key ] ) );
          }
        }
      });
    });

    if (!paginators.length) {
      paginators = [
        new PaginationOffsetRequestField(),
        new PaginationLimitRequestField(),
      ];
    }

    requestBuilder.setSorter(new RequestBuilder(sorters));
    requestBuilder.setFilter(new RequestBuilder(filters));
    requestBuilder.setPaginator(new RequestBuilder(paginators));
    console.log(requestBuilder)
    return requestBuilder;
  }
}
