/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http/http.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { FinancePayment } from './finance.payment';

@Injectable()
export class FinancePaymentService extends HttpService implements LoadableServiceInterface {
  protected getPrefix (): string {
    return 'director/payment';
  }

  create(currency: FinancePayment): Promise<FinancePayment> {
    return this.store(currency);
  }

  save (payment: FinancePayment): Promise<FinancePayment> {
    const action = payment.id ? this.put(payment.id, payment) : this.store(payment);
    return action.then(response => response.data as FinancePayment);
  }

  destroy (currency: FinancePayment): Promise<any> {
    return this.remove(currency.id);
  }
}
