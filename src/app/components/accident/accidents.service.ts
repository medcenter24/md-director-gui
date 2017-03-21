/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Accident} from "./accident";

@Injectable()
export class AccidentsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private accidentsUrl = 'director/accidents';  // URL to web api

  constructor(private http: Http) { }

  getAccidents(): Promise<Accident[]> {
    return this.http.get(this.accidentsUrl)
        .toPromise()
        .then(response => response.json().data as Accident[])
        .catch(this.handleError);
  }


  getCheckpoint(id: number): Promise<Accident> {
    const url = `${this.accidentsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Accident)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.accidentsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(accident: Accident): Promise<Accident> {
    return this.http
        .post(this.accidentsUrl, JSON.stringify(accident), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(accident: Accident): Promise<Accident> {
    const url = `${this.accidentsUrl}/${accident.id}`;
    return this.http
        .put(url, JSON.stringify(accident), {headers: this.headers})
        .toPromise()
        .then(() => accident)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
