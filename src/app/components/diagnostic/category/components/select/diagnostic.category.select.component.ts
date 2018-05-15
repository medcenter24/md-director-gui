/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { AbstractAutoCompleteController } from '../../../../ui/autocompleter/abstract.auto.complete.controller';
import { TranslateService } from '@ngx-translate/core';
import { DiagnosticCategoryService } from '../../category.service';

@Component({
  selector: 'nga-diagnostic-category-select',
  templateUrl: '../../ui/autocompleter/autocompleter.tpl.html',
})
export class DiagnosticCategorySelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'DiagnosticCategorySelectComponent';

  constructor(
    private service: DiagnosticCategoryService,
    protected translateService: TranslateService,
  ) {
    super(translateService);
  }

  getService() {
    return this.service;
  }

  getFieldKey(): string {
    return 'title';
  }

}
