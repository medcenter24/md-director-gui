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

  selectItems(items: any): void {
    if (typeof items === 'string') {
      items = +items;
    }
    if (typeof items === 'number') {
      this.afterLoaded(() => {
        this.selected = this.data.find(v => v.hasOwnProperty('id') && v['id'] === items);
      });
    } else {
      this.selected = items;
    }
    try {
      this._changeDetectionRef.detectChanges();
    } catch (e) {
      // prevent ViewDestroyedError error
      // if click back while the page is loading
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
      return this.data;
    }).catch(e => {
      console.debug('Error on auto complete static provider', e);
      this.loaded = false;
    });
  }

  filter(event): void {
    this.afterLoaded(() => this.filtering(event));
  }

  /**
   * Make action only after the data loaded
   * @param {Function} func
   */
  private afterLoaded(func: Function) {
    this.loaded ? func(this.data) : this.loadData(event).then(data => {
      func(data);
    });
  }

  /**
   * Filter data to filtered and for show
   */
  private filtering(event): void {
    this.filtered = [];
    for (const model of this.data) {
      if (model.hasOwnProperty(this.config.fieldKey)
        && model[this.config.fieldKey].toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {

        this.filtered.push(model);
      }
    }
  }
}
