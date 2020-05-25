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

import 'rxjs/add/operator/toPromise';

import { Disease } from './disease';
import { HttpService } from '../core/http/http.service';

@Injectable()
export class DiseaseService extends HttpService {

  protected getPrefix(): string {
    return 'director/diseases';
  }

  save(disease: Disease): Promise<Disease> {
    const action = disease.id ? this.put(disease.id, disease) : this.store(disease);
    return action.then(response => response as Disease);
  }

  destroy(disease: Disease): Promise<any> {
    return this.remove(disease.id);
  }
}
