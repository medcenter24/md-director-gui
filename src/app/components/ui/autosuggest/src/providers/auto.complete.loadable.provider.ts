/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { AutoCompleteProvider } from './auto.complete.provider';
import { AutoCompleteSrcConfig } from '../auto.complete.src.config';

/**
 * Loads only limit count of rows and for each request going to the server
 */
export class AutoCompleteLoadableProvider implements AutoCompleteProvider {

  /**
   * Data to show in the selector
   * @type {any[]}
   */
  filtered: Object[] = [];

  /**
   * Chosen data
   */
  selected: Object|Object[];

  constructor (private config: AutoCompleteSrcConfig) {}

  /**
   * Load Data
   * @param event
   */
  loadData(event): Promise<any> {
    return this.config.dataProvider({ q: event });
  }

  filter(event): void {
    this.loadData(event).then(data => this.filtered = data);
  }

  /**
   * Select new selection
   * @param {Object | Object[]} items
   */
  selectItems(items: Object|Object[]): void {
    this.selected = items;
  }
}
