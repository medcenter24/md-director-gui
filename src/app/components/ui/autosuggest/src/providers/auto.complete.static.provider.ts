/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { AutoCompleteProvider } from './auto.complete.provider';
import { AutoCompleteSrcConfig } from '../auto.complete.src.config';

/**
 * Load all the data and store it for application
 */
export class AutoCompleteStaticProvider implements AutoCompleteProvider {

  /**
   * Data to show in the selector
   * @type {any[]}
   */
  filtered: Object[] = [];

  /**
   * All loaded data
   * @type {any[]}
   */
  private data: Object[] = [];
  /**
   * Allow only one loading
   * @type {boolean}
   */
  private loaded: boolean = false;

  constructor (private config: AutoCompleteSrcConfig) {
    if (!config.fieldKey) {
      console.info('Field key is empty');
    }
  }

  /**
   * Load Data
   * @param event
   */
  loadData(event): Promise<any> {
    return this.config.dataProvider({}).then(resp => {
      this.data = resp.data;
      this.filtered = this.data;
      this.loaded = true;
    });
  }

  filter(event): void {
    if (!this.loaded) {
      this.loadData(event).then(() => this.filtering(event));
    } else {
      this.filtering(event);
    }
  }

  /**
   * Filter data to filtered and for show
   */
  private filtering(event): void {
    this.filtered = [];
    for (const model of this.data) {
      if (model[this.config.fieldKey].toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filtered.push(model);
      }
    }
  }
}
