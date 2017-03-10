/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Service } from './service';

@Injectable()
export class ServicesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private servicesUrl = 'director/services';  // URL to web api

  constructor(private http: Http) { }

  getServices(): Promise<Service[]> {

    return this.http.get(this.servicesUrl)
        .toPromise()
        .then(response => response.json().data as Service[])
        .catch(this.handleError);
  }


  getService(id: number): Promise<Service> {
    const url = `${this.servicesUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Service)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.servicesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(diagnostic: Service): Promise<Service> {
    return this.http
        .post(this.servicesUrl, JSON.stringify(diagnostic), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(diagnostic: Service): Promise<Service> {
    const url = `${this.servicesUrl}/${diagnostic.id}`;
    return this.http
        .put(url, JSON.stringify(diagnostic), {headers: this.headers})
        .toPromise()
        .then(() => diagnostic)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
