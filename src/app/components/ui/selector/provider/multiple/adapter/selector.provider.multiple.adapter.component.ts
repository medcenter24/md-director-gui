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
  @Output() selected: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * Filter to the data searching
   */
  @Output() filter: EventEmitter<SearchFilter> = new EventEmitter<SearchFilter>();

  /**
   * Select provided items
   * @param {any[]} items
   */
  selectItems(items: any[]): void {
   console.warn('set these items to selector');
  }

  /**
   * Chosen adapter
   * default - primeng
   * @type {string}
   */
  adapter: string = 'primeng';

  isAdapter(name: string): boolean {
    return this.adapter === name;
  }

  setAdapter(name: string): void {
    this.adapter = name;
  }

  onChanged(event: any[]): void {
    this.selected.emit(event);
  }
}
