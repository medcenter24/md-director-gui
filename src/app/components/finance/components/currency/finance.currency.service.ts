/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http/http.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { FinanceCurrency } from './finance.currency';

@Injectable()
export class FinanceCurrencyService extends HttpService implements LoadableServiceInterface {
  protected getPrefix (): string {
    return 'director/currency';
  }

  create(currency: FinanceCurrency): Promise<FinanceCurrency> {
    return this.store(currency);
  }

  save (currency: FinanceCurrency): Promise<FinanceCurrency> {
    const action = currency.id ? this.put(currency.id, currency) : this.store(currency);
    return action.then(response => response.data as FinanceCurrency);
  }

  destroy (currency: FinanceCurrency): Promise<any> {
    return this.remove(currency.id);
  }
}
