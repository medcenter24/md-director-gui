/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadableComponent } from '../../../../core/components/componentLoader';
import { AutoCompleteComponent } from '../../../autosuggest';
import { AutoCompleteSrcConfig } from '../../../autosuggest/src';
import { TranslateService } from '@ngx-translate/core';
import { SearchableServiceInterface } from '../../../../core/loadable';
import { SearchFilter } from '../../../../core/loadable/search.filter';

@Component({
  selector: 'nga-autocompleter',
  templateUrl: './autocompleter.html',
})
export class AutocompleterComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'AutocompleterComponent';

  /**
   * Service to getting data
   */
  @Input() service: SearchableServiceInterface;

  /**
   * Field from the data to use it as a label in selector
   */
  @Input() labelField: string = 'title';

  /**
   * Placeholder for the empty selector
   * @type {string}
   */
  @Input() placeholder: string = '';

  /**
   * Data to show as a selected (should be rewritable to the default state?)
   * @type {any[]}
   */
  @Input() preloadedData: any;

  /**
   * Selected options
   * @type {EventEmitter<any>}
   */
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Direct access to the child element
   */
  @ViewChild('autocompleter')
    private autocompleter: AutoCompleteComponent;

  langLoaded: boolean = false;
  autoCompleteConfig: AutoCompleteSrcConfig;

  constructor (
    protected translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.autoCompleteConfig = AutoCompleteSrcConfig.instance({
        dataProvider: (filters: SearchFilter) => {
          return this.service.search(filters);
        },
        fieldKey: this.labelField,
        preloaded: this.preloadedData,
        placeholder: this.translateService.instant(this.placeholder),
      });
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
