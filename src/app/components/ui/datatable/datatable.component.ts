/**
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

import { Component, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LoadableComponent } from '../../core/components/componentLoader';
import { LazyLoadEvent } from 'primeng/primeng';
import { DatatableAction, DatatableCol, DatatableConfig, DatatableResponse, DatatableTransformer } from './entities';
import { Location } from '@angular/common';
import { UrlHelper } from '../../../helpers/url.helper';
import { Table } from 'primeng/table';
import { RequestBuilder } from '../../core/http/request/request.builder';

@Component({
  selector: 'nga-datatable',
  templateUrl: './datatable.html',
})
export class DatatableComponent extends LoadableComponent {
  protected componentName: string = 'DatatableComponent';

  private _config: DatatableConfig ;
  private preloadDelay;

  @Input() set config(config: DatatableConfig) {

    if (!config) {
      throw new Error('Configuration is not set');
    } else {
      this._config = config;
      this.initialize();
    }
  }

  /**
   * it is used by this component only
   * we can't use it as external selector
   * to use it from elsewhere outside we need to to use this.refresh method (facade)
   */
  @ViewChild('datatable')
    private datatable: Table;

  data: any[];
  loading: boolean = false;
  selectedData: any;
  total: number = 0;
  lazyLoadEvent: LazyLoadEvent;

  constructor (
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {
    super();
  }

  private initialize() {
    if (this.getConfig() && this.getConfig().get('showRefreshBtn')) {
      this.getConfig().controlPanelActions.push(new DatatableAction(
        this.getConfig().refreshBtnTitle,
        'fa fa-refresh',
        () => {
          this.refresh();
      }));
    }

    // first loading of the table
    this.refresh();
  }

  loadLazy(event: LazyLoadEvent) {
    this.lazyLoadEvent = event;
  }

  pagedLoadLazy(requestBuilder: RequestBuilder): void {
    if (!this.getConfig().get('dataProvider')) {
      return;
    }
    console.log(this.getConfig().get('dataProvider'))
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort in single sort mode
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    // multiSortMeta: An array of SortMeta objects used in multiple columns sorting.
    //     Each SortMeta has field and order properties.
    // filters: Filters object having field as key and filter value, filter matchMode as value
    if (this.preloadDelay) {
      // to avoid quick updates
      clearTimeout(this.preloadDelay);
    }

    this.preloadDelay = setTimeout(() => {
      this.setLoading(true);
      this.getConfig().get('dataProvider').search(requestBuilder)
        .then((response: DatatableResponse) => {
          this.setLoading(false);
          this.data = response.data;
          this.total = response.meta.pagination.total;
        }).catch(() => {
        this.setLoading(false);
      });
    }, 500);
  }

  private setLoading(state: boolean): void {
    this.loading = state;
    this.cdr.detectChanges();
    if (this.loading) {
      this.startLoader( this.componentName );
    } else {
      this.stopLoader( this.componentName );
    }
  }

  onRowSelect (event): void {
    this.getConfig().onRowSelect(event);
  }

  refresh(): void {
    const requestBuilder = this.getConfig().get('requestBuilder');
    if (requestBuilder) {
      const limit = +UrlHelper.get( this.getCurrentUrl(), 'rows', requestBuilder.get( 'paginator' ).get( 'limit' ) );
      const offset = +UrlHelper.get( this.getCurrentUrl(), 'first', requestBuilder.get( 'paginator' ).get( 'offset' ) );

      requestBuilder.get( 'paginator' ).set( 'offset', offset );
      requestBuilder.get( 'paginator' ).set( 'limit', limit );

      this.datatable.first = offset; // to change the current page in the paginator
      this.pagedLoadLazy(requestBuilder);
    } else {
      throw new Error('Datatable RequestBuilder not initialized, so can not load any data');
    }
  }

  showData(rowData: string[], col: DatatableCol): string {
    const transformer: DatatableTransformer = this.getTransformer(col);
    return transformer.transform(rowData[col.field], rowData);
  }

  private getTransformer(col: DatatableCol): DatatableTransformer {
    let transformer;
    if (this.getConfig().transformers) {
      transformer = this.getConfig().transformers.find(tr => tr.field === col.field);
    }

    return transformer || new DatatableTransformer(col.field);
  }

  sort(requestBuilder: RequestBuilder) {
    console.log('customSort', requestBuilder);
    // todo run request (delayed to 3 sec in the request itself, to avoid fast clicking events)
  }

  filter(filterStatus: RequestBuilder) {
    console.log('filterStatus', filterStatus);
  }

  /**
   * Update current model in the datatable
   * @param {Object} model
   * @return {boolean}
   */
  updateModel(model: Object): boolean {
    if (!model || !model.hasOwnProperty('id')) {
      throw Error('You need to implement your own updater since this model does not have id');
    }
    let found = false;
    this.data.forEach((val, ind) => {
      if (val.id === model['id']) {
        this.data[ind] = model;
        found = true;
      }
    });
    return found;
  }

  // todo remove this
  private getCurrentUrl(): string {
    return this.location.path(true);
  }

  /**
   * set to config from query
   * todo move it to the datatable.filters.component
   */
  private updateFiltersByQuery(): any {
    // todo delete me
  }

  /**
   * set to query from config
   */
  private updateFiltersByConfig(): any {
    // todo delete me
  }

  onPageChanged(event): void {
    // I need to update request data (to have correct url)
    let location = this.getCurrentUrl();
    let first = this.getConfig().offset;
    let rows = this.getConfig().rows;
    if (+event.first) {
      first = event.first;
    }

    if (+event.rows) {
      rows = event.rows;
    }

    if (first && rows) {
      location = UrlHelper.replaceOrAdd( location, 'first', `${first}` );
      location = UrlHelper.replaceOrAdd( location, 'rows', `${rows}` );
    } else {
      location = UrlHelper.replaceOrAdd( location, 'first', `` );
      location = UrlHelper.replaceOrAdd( location, 'rows', `` );
    }
    this.location.replaceState(location);
    if (this.lazyLoadEvent) {
      this.getConfig().update('first', { first });
      this.getConfig().update('rows', { rows });
      this.refresh();
    }
  }

  /**
   * To get current datatable configuration
   */
  getConfig(): DatatableConfig {
    return this._config;
  }
}
