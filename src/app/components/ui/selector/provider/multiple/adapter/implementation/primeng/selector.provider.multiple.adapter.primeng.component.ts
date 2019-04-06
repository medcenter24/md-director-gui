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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorConfig } from '../../../../../selector.config';

/**
 * Multiple selector component
 * Now it works only with SingleLoadableProvider because primeng multi-selector has no 'filter' event
 */
@Component({
  selector: 'nga-selector-provider-multiple-adapter-primeng',
  templateUrl: './selector.provider.multiple.adapter.primeng.html',
})
export class SelectorProviderMultipleAdapterPrimengComponent {
  /**
   * Configuration
   */
  @Input() set config(conf: SelectorConfig) {
    this._config = conf;
  }

  _config: SelectorConfig;

  /**
   * Options which were/or should be selected
   */
  selectedOptions: any[];

  /**
   * Options which can be selected
   */
  @Input() options: any[];

  /**
   * Selected items
   * @type {EventEmitter<any[]>}
   */
  @Output() selected: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * On selector's changes
   * @param event
   */
  onChanged(event): void {
    this.selected.emit(event.value);
  }

  /**
   * Choosing needed options
   * @param {any[]} options
   */
  setOptions(options: any[]): void {
    this.selectedOptions = options;
    this.selected.emit(this.selectedOptions);
  }
}
