/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../../core/components/componentLoader';
import { AutoCompleteSrcConfig } from '../autosuggest/src';
import { AutoCompleteComponent } from '../autosuggest';

// template can't be inherited so it has no sense to declare abstract Component
export abstract class AbstractAutoCompleteController extends LoadableComponent implements OnInit {

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
   * Default state for the auto completer
   * If defined then reset should use this value as default for the completer
   * and empty needs to make it blank
   * @returns {any}
   */
  getPreloadedData(): any {
    return this.preloaded;
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.autoCompleteConfig = AutoCompleteSrcConfig.instance({
        dataProvider: (filters: Object) => {
          return this.getService().search(filters);
        },
        fieldKey: this.getFieldKey(),
        preloaded: this.getPreloadedData(),
      });
    });
  }

  selectItems(items: any): void {
    if (this.autocompleter) {
      this.autocompleter.selectItems(items);
    }
  }

  onChanged(event): void {
    this.selected.emit(event);
  }
}
