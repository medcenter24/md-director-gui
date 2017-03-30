/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { City } from './city';

@Injectable()
export class CitiesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private citiesUrl = 'director/cities';  // URL to web api

  constructor (private http: Http) {
  }

  getCities (): Promise<City[]> {
    return this.http.get(this.citiesUrl)
      .toPromise()
      .then(response => response.json().data as City[])
      .catch(this.handleError);
  }

  getCity (id: number): Promise<City> {
    const url = `${this.citiesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as City)
      .catch(this.handleError);
  }

  delete (id: number): Promise<void> {
    const url = `${this.citiesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create (city: City): Promise<City> {
    return this.http
      .post(this.citiesUrl, JSON.stringify(city), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update (city: City): Promise<City> {
    const url = `${this.citiesUrl}/${city.id}`;
    return this.http
      .put(url, JSON.stringify(city), {headers: this.headers})
      .toPromise()
      .then(() => city)
      .catch(this.handleError);
  }

  private handleError (error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
