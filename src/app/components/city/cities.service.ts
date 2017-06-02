/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { City } from './city';
import { HttpService } from '../http/http.service';

@Injectable()
export class CitiesService extends HttpService {

  protected getPrefix(): string {
    return 'director/cities';
  }
  
  getCities (): Promise<City[]> {
    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json().data as City[])
      .catch(this.handleError);
  }

  getCity (id: number): Promise<City> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json().data as City)
      .catch(this.handleError);
  }

  delete (id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create (city: City): Promise<City> {
    return this.http
      .post(this.getUrl(), JSON.stringify(city), {headers: this.getAuthHeaders()})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update (city: City): Promise<City> {
    const url = `${this.getUrl()}/${city.id}`;
    return this.http
      .put(url, JSON.stringify(city), {headers: this.getAuthHeaders()})
      .toPromise()
      .then(() => city)
      .catch(this.handleError);
  }

  private handleError (error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
