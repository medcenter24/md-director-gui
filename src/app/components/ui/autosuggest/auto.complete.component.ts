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
    this.conf = conf;
    this.provider = conf.provider === 'static'
      ? new AutoCompleteStaticProvider(conf)
      : new AutoCompleteLoadableProvider(conf);
  }
  @Output() changed: EventEmitter<Object|Object[]> = new EventEmitter<Object|Object[]>();

  /**
   * Data Provider for the auto completer
   */
  private provider: AutoCompleteStaticProvider | AutoCompleteLoadableProvider;

  /**
   * Selected models for the result
   */
  selected: Object | Object[];

  onSelect (): void {
    this.changed.emit(this.selected);
  }

  onBlur(): void {
    this.onSelect();
  }
}
