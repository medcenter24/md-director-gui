/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../../core/components/componentLoader';
import { AutoCompleteSrcConfig } from '../autosuggest/src';
import { Configurable } from '../../core/configurable';
import { AutoCompleteComponent } from '../autosuggest';

// template can't be inherited so it has no sense to declare abstract Component
export abstract class AbstractAutoCompleteController extends LoadableComponent implements OnInit {

  @Input() isMultiple: boolean = false;

  preloaded: Object[]|Object = [];
  @Input()
    set selectPreloaded(preloaded: Object|Object[]) {
      // we need to use both - if hasn't loaded yet - use config otherwise use component updater
      this.preloaded = preloaded;
      this.selectItems(this.preloaded);
    }

  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();

  @ViewChild('autocompleter')
    private autocompleter: AutoCompleteComponent;

  langLoaded: boolean = false;
  autoCompleteConfig: AutoCompleteSrcConfig;

  protected constructor (
    protected translateService: TranslateService,
  ) {
    super();
  }

  /**
   * Get model's data provider
   */
  abstract getService();

  /**
   * Key of the field to show in the selector
   * @returns {string}
   */
  abstract getFieldKey(): string;

  /**
   * Check if auto completer is multiple or single
   * @returns {boolean}
   */
  getIsMultiple(): boolean {
    return this.isMultiple;
  }

  /**
   * Default state for the auto completer
   * If defined then reset should use this value as default for the completer
   * and empty needs to make it blank
   * @returns {Object[] | Object}
   */
  getPreloadedData(): Object[]|Object {
    return this.preloaded;
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.autoCompleteConfig = Configurable.factory({
        dataProvider: (filters: Object) => {
          return this.getService().search(filters);
        },
        fieldKey: this.getFieldKey(),
        isMultiple: this.getIsMultiple(),
        preloaded: this.getPreloadedData(),
      }, new AutoCompleteSrcConfig());
    });
  }

  selectItems(items: Object|Object[]): void {
    if (this.autocompleter) {
      this.autocompleter.selectItems(items);
    }
  }

  onChanged(event): void {
    this.selected.emit(event);
  }
}
