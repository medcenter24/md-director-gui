/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Survey } from './survey';
import { HttpService } from '../http/http.service';
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
