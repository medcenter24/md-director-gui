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

import { Survey } from './survey';
import { HttpService } from '../core/http/http.service';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class SurveyService extends HttpService implements LoadableServiceInterface {

  protected getPrefix(): string {
    return 'director/surveys';
  }

  getSurveys(): Promise<Survey[]> {
    return this.get().then(response => response.data as Survey[]);
  }

  getSurvey(id: number): Promise<Survey> {
    return this.get(id).then(response => response.data as Survey);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(service: Survey): Promise<Survey> {
    return this.store(service).then(res => res.json().data as Survey);
  }

  update(service: Survey): Promise<Survey> {
    return this.put(service.id, service);
  }

  save(survey: Survey): Promise<Survey> {
    const action = survey.id ? this.put(survey.id, survey) : this.store(survey);
    return action.then(response => response as Survey);
  }

  destroy(survey: Survey): Promise<any> {
    return this.remove(survey.id);
  }
}
