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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UrlHelper } from '../../../../../helpers/url.helper';
import { Location } from '@angular/common';
import { DatatableConfig } from '../../entities';
import { RequestBuilder } from '../../../../core/http/request';
import { FilterRequestField } from '../../../../core/http/request/fields';

@Component({
  selector: 'nga-datatable-filter',
  templateUrl: './datatable.filters.html',
  styleUrls: ['./datatable.filters.scss'],
})
export class DatatableFiltersComponent implements OnInit {
  /**
   * ID of the filter
   */
  @Input() field: string;

  private datatableConfig: DatatableConfig;

  /**
   * Datatable configuration
   * @param config
   */
  @Input() set config(config: DatatableConfig) {

    if (!config) {
      throw new Error('Configuration is not set');
    } else {
      this.datatableConfig = config;
    }

    // filters
    this.updateFromUri();
  }

  /**
   * emit when needs to be filtered
   */
  @Output() changed: EventEmitter<RequestBuilder> = new EventEmitter<RequestBuilder>();

  /**
   * All filters for current search process
   */
  private filtersStatus: RequestBuilder;
  /**
   * Current Filter Object
   */
  protected currentFilter: FilterRequestField;
  /**
   * Entered or selected value
   */
  private searchString: string = '';

  constructor (
    private location: Location,
  ) {
  }

  ngOnInit (): void {
    this.filtersStatus = this.datatableConfig.get('filters');
    this.currentFilter = <FilterRequestField>this.filtersStatus.getRequestField(this.field);
    console.log(this.currentFilter)
    this.updateFromUri();
  }

  private changeUri(): void {
    // todo
  }

  private updateFromUri(): void {
    const queryFilters = UrlHelper.get(this.getCurrentUrl(), 'filters', '');
    console.log(queryFilters);
    /*const queryFiltersKeys = Object.keys(queryFilters);
    if (queryFiltersKeys.length) {
      const _filters = {};
      queryFiltersKeys.forEach(k => {
        _filters[k] = { value: queryFilters[k]['value'], matchMode: queryFilters[k]['matchMode'] } as FilterMetadata;
      });
      this.datatableConfig.update('filters', _filters);
    }*/
  }

  private getCurrentUrl(): string {
    return this.location.path(true);
  }

  private updateFromConfig(): void {
    const filters = this.datatableConfig.get('filters');
    let location = this.getCurrentUrl();
    const _filters = filters && Object.keys(filters).length ? encodeURIComponent(`${JSON.stringify(filters)}`) : '';
    location = UrlHelper.replaceOrAdd(location, 'filters', _filters);
    this.location.replaceState(location);
  }

  fillFilter(val: string): void {
    this.searchString = val;
  }
}
