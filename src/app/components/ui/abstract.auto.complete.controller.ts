/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../core/components/componentLoader';
import { AutoCompleteSrcConfig } from './autosuggest/src';
import { Configurable } from '../core/configurable';
import { AutoCompleteComponent } from './autosuggest';

// template can't be inherited so it has no sense to declare abstract Component
export abstract class AbstractAutoCompleteController extends LoadableComponent implements OnInit {

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
    return false;
  }

  /**
   * Default state for the auto completer
   * If defined then reset should use this value as default for the completer
   * and empty needs to make it blank
   * @returns {Object[] | Object}
   */
  getPreloadedData(): Object[]|Object {
    return [];
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.autoCompleteConfig = Configurable.factory({
        dataProvider: (filters: Object) => {
          return this.getService().find(filters);
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
}
