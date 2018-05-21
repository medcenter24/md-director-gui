/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { FinanceRule } from './financeRule';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class FinanceService extends HttpService implements LoadableServiceInterface {
  protected getPrefix (): string {
    return 'director/finance';
  }

  create(financeRule: FinanceRule): Promise<FinanceRule> {
    return this.store(financeRule);
  }

  save (finance: FinanceRule): Promise<FinanceRule> {
    const action = finance.id ? this.put(finance.id, finance) : this.store(finance);
    return action.then(response => response.data as FinanceRule);
  }

  destroy (financeRule: FinanceRule): Promise<any> {
    return this.remove(financeRule);
  }
}
