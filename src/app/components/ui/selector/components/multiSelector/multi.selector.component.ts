/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadableComponent } from '../../../../core/components/componentLoader';
import { TranslateService } from '@ngx-translate/core';
import { SelectorConfig } from '../../selector.config';
import { SearchableServiceInterface } from '../../../../core/loadable';

@Component({
  selector: 'nga-multi-selector',
  templateUrl: './multi.selector.html',
})
export class MultiSelectorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'MultiSelectorComponent';

  langLoaded: boolean = false;
  config: SelectorConfig;

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
   * Data to show as a selected (should be revertable to the default state?)
   * @type {any[]}
   */
  @Input() preloadedData: any;

  /**
   * Event on cities changed
   * @type {EventEmitter<any>}
   */
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  constructor (
    protected translateService: TranslateService,
  ) {
    super();
  }

  /**
   * Action on data selected
   * @param event
   * @returns {any[]}
   */
  onSelected(event): void {
    return this.selected.emit(event);
  }

  /**
   * Initialize after the component loading
   */
  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.config = SelectorConfig.instance({
        dataProvider: this.service,
        labelField: this.labelField,
        placeholder: this.translateService.instant(this.placeholder),
        preloaded: this.preloadedData,
      });
    });
  }
}
