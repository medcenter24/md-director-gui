/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Service } from './service';
import { HttpService } from '../http/http.service';

@Injectable()
export class ServicesService extends HttpService {
  
  protected getPrefix(): string {
    return 'director/services';
  }

  getServices(): Promise<Service[]> {

    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Service[])
        .catch(this.handleError);
  }

  getService(id: number): Promise<Service> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Service)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(service: Service): Promise<Service> {
    return this.http
        .post(this.getUrl(), JSON.stringify(service), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(service: Service): Promise<Service> {
    const url = `${this.getUrl()}/${service.id}`;
    return this.http
        .put(url, JSON.stringify(service), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => service)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
