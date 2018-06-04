/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorConfig } from '../../selector.config';

@Component({
  selector: 'nga-auto-complete',
  templateUrl: './auto.complete.html',
})
export class AutoCompleteComponent {

  /**
   * Configuration
   */
  conf: SelectorConfig;

  @Input() set config(conf: SelectorConfig) {
    // init conf
    this.conf = conf;
  }
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

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
