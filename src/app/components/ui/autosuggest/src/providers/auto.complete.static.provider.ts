/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { AutoCompleteProvider } from './auto.complete.provider';
import { AutoCompleteSrcConfig } from '../auto.complete.src.config';
import { ChangeDetectorRef } from '@angular/core';

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
   * Selected data
   */
  selected: Object|Object[];

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

  constructor (
    private config: AutoCompleteSrcConfig,
    private _changeDetectionRef: ChangeDetectorRef,
  ) {
    if (!config.fieldKey) {
      console.info('Field key is empty');
    }
    this.selectItems(config.preloaded);
  }

  selectItems(items: Object|Object[], resolve: Function = () => {}): void {
    this.selected = items;
    this._changeDetectionRef.detectChanges();
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
