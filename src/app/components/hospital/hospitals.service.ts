/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Hospital} from "./hospital";

@Injectable()
export class HospitalsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private hospitalsUrl = 'director/hospitals';  // URL to web api

  constructor(private http: Http) { }

  getHospitals(): Promise<Hospital[]> {

    return this.http.get(this.hospitalsUrl)
        .toPromise()
        .then(response => response.json().data as Hospital[])
        .catch(this.handleError);
  }


  getHospital(id: number): Promise<Hospital> {
    const url = `${this.hospitalsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Hospital)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.hospitalsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(hospital: Hospital): Promise<Hospital> {
    return this.http
        .post(this.hospitalsUrl, JSON.stringify(hospital), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(hospital: Hospital): Promise<Hospital> {
    const url = `${this.hospitalsUrl}/${hospital.id}`;
    return this.http
        .put(url, JSON.stringify(hospital), {headers: this.headers})
        .toPromise()
        .then(() => hospital)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
