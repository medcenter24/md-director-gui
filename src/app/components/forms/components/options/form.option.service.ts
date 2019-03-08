/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormOption } from './form.option';

@Injectable()
export class FormOptionService {

  constructor(public translateService: TranslateService) {}

  getFormOptions(): Promise<FormOption[]> {
    return new Promise<FormOption[]>(resolve => {
      this.translateService.get('Yes').subscribe(() => {
        resolve ([
          // todo needs to be hardcoded on the backend, because I use them there
          new FormOption(this.translateService.instant('Patient Name'), ':patient.name', 'App\\Accident'),
          new FormOption(this.translateService.instant('Doctor Name'), ':doctor.name', 'App\\Accident'),
          new FormOption(this.translateService.instant('Ref. Number'), ':ref.number', 'App\\Accident'),
          new FormOption(this.translateService.instant('Hospital Title'), ':hospital.title', 'App\\Accident'),
        ]);
      });
    });
  }

  getOptions(type: string): Promise<FormOption[]> {
    return this.getFormOptions().then((formOptions: FormOption[]) => {
      return formOptions.filter((formOption: FormOption) => formOption.type === type);
    });
  }

  get(key: string): Promise<FormOption> {
    return this.getFormOptions()
      .then((options: FormOption[]) => options.find((formOption: FormOption) => formOption.key === key));
  }
}
