/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Doctor} from "./doctor";

@Injectable()
export class DoctorsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private doctorUrl = 'director/doctors';  // URL to web api

  constructor(private http: Http) { }

  getDoctors(): Promise<Doctor[]> {

    return this.http.get(this.doctorUrl)
        .toPromise()
        .then(response => response.json().data as Doctor[])
        .catch(this.handleError);
  }


  getDoctor(id: number): Promise<Doctor> {
    const url = `${this.doctorUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Doctor)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.doctorUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(doctor: Doctor): Promise<Doctor> {
    return this.http
        .post(this.doctorUrl, JSON.stringify(doctor), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(doctor: Doctor): Promise<Doctor> {
    const url = `${this.doctorUrl}/${doctor.id}`;
    return this.http
        .put(url, JSON.stringify(doctor), {headers: this.headers})
        .toPromise()
        .then(() => doctor)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
