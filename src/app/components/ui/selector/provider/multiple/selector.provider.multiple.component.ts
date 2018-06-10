/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectorConfig } from '../../selector.config';
import { SearchFilter } from '../../../../core/loadable/search.filter';
import { SelectorProviderMultipleAdapterComponent } from './adapter';
import { LoadableComponent } from '../../../../core/components/componentLoader';

@Component({
  selector: 'nga-selector-multiple',
  templateUrl: './selector.provider.multiple.html',
})
export class SelectorProviderMultipleComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'SelectorProviderMultipleComponent';

  /**
   * Income configuration
   * @param {SelectorConfig} conf
   */
  @Input() set setConfig(conf: SelectorConfig) {
    this.conf = conf;
  }

  /**
   * Selected options
   * @type {EventEmitter<any[]>}
   */
  @Output() selected: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * Html adapter element
   */
  @ViewChild('selectorProviderMultipleAdapter')
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

  ngOnInit(): void {
    this.loadData(null).then(() => {
      this.selectItems(this.conf.preloaded);
    });
  }

  /**
   * Make provided items selected in the selector
   * @param {any[]} items
   */
  selectItems(items: any): void {
    let selected: any = items;
    if (typeof items === 'number') {
      // by ID
      selected = [this.options.find(v => v.hasOwnProperty('id') && v['id'] === items)];
    } else if (typeof items === 'object') {
      // if list of ID's
      const isIds = items.find(v => typeof v !== 'number');
      if (!isIds) {
        selected = this.options.filter(v => v.hasOwnProperty('id') && this.options.indexOf(v['id']));
      }
    }
    if (selected && selected.length) {
      this.adapter.selectItems(selected);
    }
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
        return this.options;
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
