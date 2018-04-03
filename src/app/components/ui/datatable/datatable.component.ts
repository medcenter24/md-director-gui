/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { LoadableComponent } from '../../core/components/componentLoader/LoadableComponent';
import { DataTable, LazyLoadEvent } from 'primeng/primeng';
import { DatatableConfig } from './datatable.config';

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
  filters: Object = {};

  constructor (private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.filters = {
      rows: this.config.rows,
      offset: this.config.offset,
    };
  }

  loadLazy(event: LazyLoadEvent) {
    this.setLoading(true);

    this.config.dataProvider(this.filters).then(data => {
      this.setLoading(false);
      this.data = data;
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
