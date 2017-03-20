/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AccidentType} from "./type";

@Injectable()
export class AccidentTypesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private typesUrl = 'director/types';  // URL to web api

  constructor(private http: Http) { }

  getTypes(): Promise<AccidentType[]> {
    return this.http.get(this.typesUrl)
        .toPromise()
        .then(response => response.json().data as AccidentType[])
        .catch(this.handleError);
  }


  getType(id: number): Promise<AccidentType> {
    const url = `${this.typesUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as AccidentType)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.typesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(type: AccidentType): Promise<AccidentType> {
    return this.http
        .post(this.typesUrl, JSON.stringify(type), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(type: AccidentType): Promise<AccidentType> {
    const url = `${this.typesUrl}/${type.id}`;
    return this.http
        .put(url, JSON.stringify(type), {headers: this.headers})
        .toPromise()
        .then(() => type)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
