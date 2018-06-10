/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SelectorConfig } from '../../../selector.config';
import { SearchFilter } from '../../../../../core/loadable/search.filter';
import { SelectorProviderMultipleAdapterPrimengComponent } from './implementation/primeng';

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

  @ViewChild('primeNgAdapter')
    primeng: SelectorProviderMultipleAdapterPrimengComponent;

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

  /**
   * Select provided items
   * @param {any[]} items
   */
  selectItems(items: any[]): void {
    this.primeng.setOptions(items);
  }
}
