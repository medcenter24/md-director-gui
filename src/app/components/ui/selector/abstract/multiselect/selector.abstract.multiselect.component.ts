/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Injectable, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../../core/components/componentLoader';
import { TranslateService } from '@ngx-translate/core';
import { SelectorConfig } from '../../selector.config';

@Injectable()
export abstract class SelectorAbstractMultiselectComponent extends LoadableComponent implements OnInit {
  langLoaded: boolean = false;
  preloaded: any = [];
  selectorConfig: SelectorConfig;

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
   * @returns {Object[] | Object}
   */
  getPreloadedData(): Object[]|Object {
    return this.preloaded;
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.selectorConfig = SelectorConfig.instance({});
    });
  }
}
