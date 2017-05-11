/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HospitalAccident } from './hospitalAccident';

@Injectable()
export class HospitalAccidentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'director/hospitalcases';  // URL to web api

  constructor(private http: Http) { }

  getAccident(id: number): Promise<HospitalAccident> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as HospitalAccident)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
