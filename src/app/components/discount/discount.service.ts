/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import { Discount } from './discount';
import { HttpService } from '../http/http.service';

@Injectable()
export class DiscountService extends HttpService {

  protected getPrefix() {
    return 'director/discounts';
  }

  getDiscounts(): Promise<Discount[]> {
    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Discount[])
        .catch(this.handleError);
  }

  getDiscount(id: number): Promise<Discount> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as Discount)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(discount: Discount): Promise<Discount> {
    return this.http
        .post(this.getUrl(), JSON.stringify(discount), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  update(discount: Discount): Promise<Discount> {
    const url = `${this.getUrl()}/${discount.id}`;
    return this.http
        .put(url, JSON.stringify(discount), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => discount)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
