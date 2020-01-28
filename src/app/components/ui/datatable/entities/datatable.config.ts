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

import { DatatableAction } from './datatable.action';
import { DatatableCol } from './datatable.col';
import { DatatableTransformer } from './datatable.transformer';
import { FilterMetadata } from 'primeng/components/common/filtermetadata';
import { SortEvent } from 'primeng/api';
import { HttpService } from '../../../core/http/http.service';
import { DatatableRequestBuilder } from '../request/datatable.request.builder';

export class DatatableConfig {

  constructor (
    public dataProvider: HttpService = null,
    public requestBuilder: DatatableRequestBuilder = null,
    public lazy: boolean = true,
    public paginator: boolean = true,
    public rows: number = 25,
    public offset: number = 0,
    public selectionMode: string = 'single',
    public controlPanel: boolean = false,
    public controlPanelActions: DatatableAction[] = null,
    public captionPanelActions: DatatableAction[] = null,
    public transformers: DatatableTransformer[] = null,
    public captionPanel: boolean = false,
    public csvExportAll: boolean = false,
    public csvExportAllTitle: string = 'All Data',
    public csvExportSelections: boolean = false,
    public csvExportSelectionsTitle: string = 'Selection Only',
    public cols: DatatableCol[] = null,
    public onRowSelect: Function = function() { },
    public showTotal: boolean = true,
    public refreshBtnTitle: string = 'Refresh',
    public showRefreshBtn: boolean = true,
    /**
     * List of columns to be sorted by
     */
    public sortBy: SortEvent[] = null,
    /**
     * { [s: string]: FilterMetadata } filtering of the data
     * @type {null|{ [s: string]: FilterMetadata }}
     */
    public filters: { [s: string]: FilterMetadata } = null,
    /**
     * to Show filters next to the head column
     * @type boolean
     */
    public showColumnFilters: boolean = false,
  ) { }

  /**
   * Apply configuration from the object
   * @param configuration
   */
  static factory(configuration: Object) {
    const config = new DatatableConfig();
    if (configuration) {
      Object.keys(config).forEach((prop: string) => config.update(prop, configuration));
    }
    return config;
  }

  update(key: string, fromConf: Object) {
    if (fromConf.hasOwnProperty(key)) {
      this[key] = fromConf[key];
    }
  }

  get(key: string): any {
    return this[key];
  }
}
