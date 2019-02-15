/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { DoctorsService } from '../../doctors.service';
import { AbstractAutoCompleteController } from '../../../ui/autocompleter';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-select-doctor',
  templateUrl: '../../../ui/autocompleter/autocompleter.tpl.html',
})
export class DoctorSelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'DoctorSelectComponent';

  constructor(
    private service: DoctorsService,
    protected translateService: TranslateService,
  ) {
    super(translateService);
  }

  getService() {
    return this.service;
  }

  getFieldKey(): string {
    return 'name';
  }
}
