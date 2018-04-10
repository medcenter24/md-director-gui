/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { LoadableComponent } from '../../core/components/componentLoader/LoadableComponent';
import { DataTable, LazyLoadEvent } from 'primeng/primeng';
import { DatatableConfig } from './datatable.config';
import { DatatableResponse } from './datatable.response';
import { DatatableAction } from './datatable.action';

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
      this.config.controlPanelActions.push(new DatatableAction(this.config.refreshBtnTitle, 'fa-refresh', () => {
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

    this.config.dataProvider(event).then((response: DatatableResponse) => {
      this.setLoading(false);
      this.data = response.data;
      this.total = response.meta.pagination.total;
    }).catch(err => {
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
}
