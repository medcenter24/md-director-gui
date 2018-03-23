/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { FinanceRule } from './financeRule';

@Injectable()
export class FinanceService extends HttpService {
  protected getPrefix (): string {
    return 'finance';
  }

  create(financeRule: FinanceRule): Promise<FinanceRule> {
    return this.store(financeRule);
  }
}
