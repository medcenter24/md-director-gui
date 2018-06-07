/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SelectorConfig } from '../../selector.config';
import { SearchFilter } from '../../../../core/loadable/search.filter';
import { SelectorProviderMultipleAdapterComponent } from './adapter';
import { LoadableComponent } from '../../../../core/components/componentLoader';

@Component({
  selector: 'nga-selector-multiple',
  templateUrl: './selector.provider.multiple.html',
})
export class SelectorProviderMultipleComponent extends LoadableComponent {
  protected componentName: string = 'SelectorProviderMultipleComponent';

  /**
   * Income configuration
   * @param {SelectorConfig} conf
   */
  @Input() set setConfig(conf: SelectorConfig) {
    this.conf = conf;
    this.loadData(null).then(() => {
      // add preselected choice?
      this.isLoaded = true;
    });
  }

  /**
   * Selected options
   * @type {EventEmitter<any[]>}
   */
  @Output() selected: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * Html adapter element
   */
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
   * When data is ready
   * @type {boolean}
   */
  isLoaded: boolean = false;

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
    const postfix = 'LoadData';
    this.startLoader(postfix);
    return this.conf.dataProvider
      .search(filter).then(response => {
        this.stopLoader(postfix);
        this.options = response.data;
      }).catch(() => this.stopLoader(postfix));
  }

  /**
   * On selections changed
   * @param event
   */
  onChanged(event: any[]) {
    this.selected.emit(event);
  }

}
