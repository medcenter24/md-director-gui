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
   */
  abstract getFieldKey(): string;

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.autoCompleteConfig = Configurable.factory({
        dataProvider: (filters: Object) => {
          return this.getService().find(filters);
        },
        fieldKey: this.getFieldKey(),
      }, new AutoCompleteSrcConfig());
    });
  }
}
