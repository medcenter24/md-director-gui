/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
          new FormOption(this.translateService.instant('Patient Name'), ':patient.name', 'medcenter24\\mcCore\\App\\Accident'),
          new FormOption(this.translateService.instant('Doctor Name'), ':doctor.name', 'medcenter24\\mcCore\\App\\Accident'),
          new FormOption(this.translateService.instant('Ref. Number'), ':ref.number', 'medcenter24\\mcCore\\App\\Accident'),
          new FormOption(this.translateService.instant('Hospital Title'), ':hospital.title', 'medcenter24\\mcCore\\App\\Accident'),
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
