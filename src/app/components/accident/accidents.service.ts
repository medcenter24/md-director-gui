/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Accident } from './accident';
import { HttpService } from '../http/http.service';

@Injectable()
export class AccidentsService extends HttpService {

  protected getPrefix () : string {
    return 'director/accidents';
  }

  getAccidents(): Promise<Accident[]> {
    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Accident[])
        .catch(this.handleError);
  }

  getAccident(id: number): Promise<Accident> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Accident)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(accident: Accident): Promise<Accident> {
    return this.http
        .post(this.getUrl(), JSON.stringify(accident), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(accident: Accident): Promise<Accident> {
    const url = `${this.getUrl()}/${accident.id}`;
    return this.http
        .put(url, JSON.stringify(accident), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => accident)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
