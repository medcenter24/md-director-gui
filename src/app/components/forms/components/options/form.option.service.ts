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
import { FormOption } from './form.option';
import { HttpService } from '../../../core/http/http.service';

@Injectable()
export class FormOptionService extends HttpService {

  protected getPrefix (): string {
    return 'director/forms/variables';
  }

  getFormOptions(filters): Promise<FormOption[]> {
    return this.search(filters).then(response => response.data as FormOption[]);
  }

  getOptions(type: string): Promise<FormOption[]> {
    return this.getFormOptions({ type });
  }

  get(key: string): Promise<FormOption> {
    return this.getFormOptions({ key })
      .then((options: FormOption[]) => options.find((formOption: FormOption) => formOption.key === key));
  }
}
