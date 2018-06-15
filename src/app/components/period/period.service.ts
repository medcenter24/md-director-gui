/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Period } from './period';

@Injectable()
export class PeriodService extends HttpService {
  protected getPrefix(): string {
    return 'director/periods';
  }

  save (datePeriod: Period): Promise<Period> {
    const action = datePeriod.id ? this.put(datePeriod.id, datePeriod) : this.store(datePeriod);
    return action.then(response => response.data as Period);
  }

  destroy (datePeriod: Period): Promise<any> {
    return this.remove(datePeriod.id);
  }
}
