/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Doctor} from "./doctor";
import { HttpService } from '../http/http.service';

@Injectable()
export class DoctorsService extends HttpService {

  protected getPrefix(): string {
    return 'director/doctors';
  }
  
  getDoctors(): Promise<Doctor[]> {

    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Doctor[])
        .catch(this.handleError);
  }

  getDoctor(id: number): Promise<Doctor> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Doctor)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(doctor: Doctor): Promise<Doctor> {
    return this.http
        .post(this.getUrl(), JSON.stringify(doctor), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json() as Doctor)
        .catch(this.handleError);
  }

  update(doctor: Doctor): Promise<Doctor> {
    const url = `${this.getUrl()}/${doctor.id}`;
    return this.http
        .put(url, JSON.stringify(doctor), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => doctor)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
