/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import { AccidentDiscount } from './discount';

@Injectable()
export class AccidentDiscountsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private discountsUrl = 'director/discounts';  // URL to web api

  constructor(private http: Http) { }

  getDiscounts(): Promise<AccidentDiscount[]> {
    return this.http.get(this.discountsUrl)
        .toPromise()
        .then(response => response.json().data as AccidentDiscount[])
        .catch(this.handleError);
  }


  getDiscount(id: number): Promise<AccidentDiscount> {
    const url = `${this.discountsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as AccidentDiscount)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.discountsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(discount: AccidentDiscount): Promise<AccidentDiscount> {
    return this.http
        .post(this.discountsUrl, JSON.stringify(discount), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(discount: AccidentDiscount): Promise<AccidentDiscount> {
    const url = `${this.discountsUrl}/${discount.id}`;
    return this.http
        .put(url, JSON.stringify(discount), {headers: this.headers})
        .toPromise()
        .then(() => discount)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
