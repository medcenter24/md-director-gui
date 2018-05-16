/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { AbstractAutoCompleteController } from '../../../../ui/autocompleter/abstract.auto.complete.controller';
import { TranslateService } from '@ngx-translate/core';
import { DiagnosticCategoryService } from '../../category.service';
import { DiagnosticCategory } from '../../category';

@Component({
  selector: 'nga-diagnostic-category-select',
  templateUrl: '../../../../ui/autocompleter/autocompleter.tpl.html',
})
export class DiagnosticCategorySelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'DiagnosticCategorySelectComponent';

  @Input()
  set diagnosticCategoryId(id: number) {
    this.setDiagnosticCategoryById(id);
  }

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

  setDiagnosticCategoryById(categoryId: number): void {
    const hasDiagnosticCategory = +categoryId;
    if (hasDiagnosticCategory) {
      const postfix = 'GetDiagnostic';
      this.startLoader(postfix);
      this.service.getCategory(categoryId).then((diagnosticCategory: DiagnosticCategory) => {
        this.stopLoader(postfix);
        this.selectItems(diagnosticCategory);
      }).catch(() => {
        this.stopLoader(postfix);
        this.selectItems(new DiagnosticCategory());
      });
    } else {
      this.selectItems(new DiagnosticCategory());
    }
  }

}
