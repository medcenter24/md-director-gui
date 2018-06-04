/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorConfig } from '../../../selector.config';
import { SearchFilter } from '../../../../../core/loadable/search.filter';

@Component({
  selector: 'nga-selector-provider-multiple-adapter',
  templateUrl: './selector.provider.multiple.adapter.html',
})
export class SelectorProviderMultipleAdapterComponent {

  /**
   * Configuration
   */
  @Input() config: SelectorConfig;

  /**
   * Options which can be selected
   */
  @Input() options: any[];

  /**
   * Returns selected options
   * @type {EventEmitter<any[]>}
   */
  @Output() change: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * Filter to the data searching
   */
  @Output() filter: SearchFilter;

  selectItems(items: any[]): void {
    this.change.emit(items);
  }
}
