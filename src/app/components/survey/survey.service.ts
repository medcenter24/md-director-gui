/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Survey } from './survey';
import { HttpService } from '../http/http.service';

@Injectable()
export class SurveyService extends HttpService {
  
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
}
