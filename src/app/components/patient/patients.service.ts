/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Patient } from './patient';
import { HttpService } from '../http/http.service';

@Injectable()
export class PatientsService extends HttpService {

  protected getPrefix(): string {
    return 'director/patients';
  }
  
  getPatients(): Promise<Patient[]> {

    return this.http.get(this.getUrl())
        .toPromise()
        .then(response => response.json().data as Patient[])
        .catch(this.handleError);
  }

  getPatient(id: number): Promise<Patient> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Patient)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(patient: Patient): Promise<Patient> {
    return this.http
        .post(this.getUrl(), JSON.stringify(patient), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(patient: Patient): Promise<Patient> {
    const url = `${this.getUrl()}/${patient.id}`;
    return this.http
        .put(url, JSON.stringify(patient), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => patient)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
