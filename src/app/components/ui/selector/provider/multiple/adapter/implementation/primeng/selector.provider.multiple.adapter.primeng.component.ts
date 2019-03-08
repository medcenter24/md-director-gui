/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
