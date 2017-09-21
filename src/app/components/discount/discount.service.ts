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
    return this.get().then(response => response.json().data as Discount[]);
  }

  getDiscount(id: number): Promise<Discount> {
    return this.get(id).then(response => response.json().data as Discount);
  }

  delete(id: number): Promise<void> {
    return this.delete(id);
  }

  create(discount: Discount): Promise<Discount> {
    return this.store(discount).then(res => res.json() as Discount);
  }

  update(discount: Discount): Promise<Discount> {
    return this.put(discount.id, discount);
  }
}
