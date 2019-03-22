/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
