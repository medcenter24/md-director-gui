/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { LoadableComponent } from '../../core/components/componentLoader';
import { DataTable, LazyLoadEvent } from 'primeng/primeng';
import { DatatableConfig } from './datatable.config';
import { DatatableResponse } from './datatable.response';
import { DatatableAction } from './datatable.action';
import { DatatableTransformer } from './datatable.transformer';
import { DatatableCol } from './datatable.col';

@Component({
  selector: 'nga-datatable',
  templateUrl: './datatable.html',
})
export class DatatableComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'DatatableComponent';

  @Input() config: DatatableConfig;

  @ViewChild('datatable')
    private datatable: DataTable;

  data: any[];
  loading: boolean = false;
  selectedData: any;
  total: number = 0;

  constructor (
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.config.showRefreshBtn) {
      this.config.controlPanelActions.push(new DatatableAction(this.config.refreshBtnTitle, 'fa fa-refresh', () => {
        this.refresh();
      }));
    }
  }

  loadLazy(event: LazyLoadEvent) {
    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    this.setLoading(true);

    if (!event.sortField && this.config.sortBy) {
      event.sortField = this.config.sortBy;
      event.sortOrder = this.config.sortOrder;
    }

    this.config.dataProvider(event).then((response: DatatableResponse) => {
      this.setLoading(false);
      this.data = response.data;
      this.total = response.meta.pagination.total;
    }).catch(() => {
      this.setLoading(false);
    });
  }

  private setLoading(state: boolean): void {
    this.loading = state;
    this.cdr.detectChanges();
  }

  onRowSelect (event): void {
    this.config.onRowSelect(event);
  }

  refresh(): void {
    this.datatable.reset();
  }

  showData(rowData: string[], col: DatatableCol): string {
    const transformer: DatatableTransformer = this.getTransformer(col);
    return transformer.transform(rowData[col.field], rowData);
  }

  private getTransformer(col: DatatableCol): DatatableTransformer {
    let transformer;
    if (this.config.transformers) {
      transformer = this.config.transformers.find(tr => tr.field === col.field);
    }

    return transformer || new DatatableTransformer(col.field);
  }

  /**
   * Checks that field could be sorted
   * @param {string} field
   * @returns {boolean}
   */
  isSortable(field: string): boolean {
    return this.config.sort && (!this.config.sortable
      || !this.config.sortable.length
      || this.config.sortable.indexOf(field) !== -1);
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
}
