/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoCompleteConfig } from './auto.complete.config';

@Component({
  selector: 'nga-auto-complete',
  templateUrl: './auto.complete.html',
})
export class AutoCompleteComponent {

  /**
   * Configuration
   */
  conf: AutoCompleteConfig;

  @Input() set config(conf: AutoCompleteConfig) {
    // init conf
    this.conf = conf;
  }
  @Output() changed: EventEmitter<Object|Object[]> = new EventEmitter<Object|Object[]>();

  constructor(
    // private _changeDetectionRef: ChangeDetectorRef,
  ) {}

  /**
   * Data Provider for the auto completer
   */
  // private provider: AutoCompleteStaticProvider | AutoCompleteLoadableProvider;

  onSelect (): void {
    // this.changed.emit(this.provider.selected);
  }

  selectItems(items: Object|Object[]): void {
    // this.provider.selectItems(items);
  }
}
