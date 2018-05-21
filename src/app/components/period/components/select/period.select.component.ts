/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { AbstractAutoCompleteController } from '../../../ui/autocompleter';
import { TranslateService } from '@ngx-translate/core';
import { PeriodService } from '../../period.service';

@Component({
  selector: 'nga-period-select',
  templateUrl: '../../../ui/autocompleter/autocompleter.tpl.html',
})
export class PeriodSelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'DoctorSelectComponent';

  constructor(
    private service: PeriodService,
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
