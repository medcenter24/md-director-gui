/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AutoCompleteLoadableProvider,
  AutoCompleteSrcConfig,
  AutoCompleteStaticProvider,
} from './src';

@Component({
  selector: 'nga-auto-complete',
  templateUrl: './auto.complete.html',
})
export class AutoCompleteComponent {

  /**
   * Configuration
   */
  conf: AutoCompleteSrcConfig;

  @Input() set config(conf: AutoCompleteSrcConfig) {
    // init conf
    this.conf = conf;
    // reload data provider
    this.provider = conf.provider === 'static'
      ? new AutoCompleteStaticProvider(conf)
      : new AutoCompleteLoadableProvider(conf);
  }
  @Output() changed: EventEmitter<Object|Object[]> = new EventEmitter<Object|Object[]>();

  /**
   * Data Provider for the auto completer
   */
  private provider: AutoCompleteStaticProvider | AutoCompleteLoadableProvider;

  onSelect (): void {
    this.changed.emit(this.provider.selected);
  }

  onBlur(): void {
    this.onSelect();
  }

  selectItems(items: Object|Object[]): void {
    this.provider.selectItems(items);
  }
}
