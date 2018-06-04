/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SelectorConfig } from '../../selector.config';
import { SearchFilter } from '../../../../core/loadable/search.filter';
import { SelectorProviderMultipleAdapterComponent } from './adapter';

@Component({
  selector: 'nga-selector-multiple',
  templateUrl: './selector.provider.multiple.html',
})
export class SelectorProviderMultipleComponent {
  protected componentName: string = 'SelectorProviderMultipleComponent';

  @Input() set setConfig(conf: SelectorConfig) {
    this.conf = conf;
  }

  @Output() selected: EventEmitter<any[]> = new EventEmitter<any[]>();

  @ViewChild(SelectorProviderMultipleAdapterComponent)
    adapter: SelectorProviderMultipleAdapterComponent;

  /**
   * Configuration for the current selector
   */
  conf: SelectorConfig;
  /**
   * Options to show in selector
   * According to current filter or first which were loaded from the storage
   * @type {any[]}
   */
  options: any[] = [];

  /**
   * Make provided items selected in the selector
   * @param {any[]} items
   */
  selectItems(items: any[]): void {
    this.adapter.selectItems(items);
  }

  /**
   * Load data according to the provided filter
   * @param {SearchFilter} filter
   * @returns {Promise<any>}
   */
  loadData(filter: SearchFilter = null): Promise<any> {
    return this.conf.dataProvider
      .search(filter).then(data => this.options = data);
  }

  /**
   * On selections changed
   * @param event
   */
  onChange(event) {
    this.selected.emit(event);
  }

}
