/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Patient } from './patient';

@Injectable()
export class PatientsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private patientsUrl = 'director/patients';  // URL to web api

  constructor(private http: Http) { }

  getPatients(): Promise<Patient[]> {

    return this.http.get(this.patientsUrl)
        .toPromise()
        .then(response => response.json().data as Patient[])
        .catch(this.handleError);
  }


  getPatient(id: number): Promise<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Patient)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(patient: Patient): Promise<Patient> {
    return this.http
        .post(this.patientsUrl, JSON.stringify(patient), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(patient: Patient): Promise<Patient> {
    const url = `${this.patientsUrl}/${patient.id}`;
    return this.http
        .put(url, JSON.stringify(patient), {headers: this.headers})
        .toPromise()
        .then(() => patient)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
