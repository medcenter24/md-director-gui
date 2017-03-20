/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AccidentStatus} from "./status";

@Injectable()
export class AccidentStatusesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private statusesUrl = 'director/statuses';  // URL to web api

  constructor(private http: Http) { }

  getStatuses(): Promise<AccidentStatus[]> {
    return this.http.get(this.statusesUrl)
        .toPromise()
        .then(response => response.json().data as AccidentStatus[])
        .catch(this.handleError);
  }


  getStatuse(id: number): Promise<AccidentStatus> {
    const url = `${this.statusesUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as AccidentStatus)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.statusesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(statuse: AccidentStatus): Promise<AccidentStatus> {
    return this.http
        .post(this.statusesUrl, JSON.stringify(statuse), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(statuse: AccidentStatus): Promise<AccidentStatus> {
    const url = `${this.statusesUrl}/${statuse.id}`;
    return this.http
        .put(url, JSON.stringify(statuse), {headers: this.headers})
        .toPromise()
        .then(() => statuse)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
