/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { DatePeriod } from './datePeriod';

@Injectable()
export class DatePeriodService extends HttpService {
  protected getPrefix(): string {
    return 'director/periods';
  }

  /*
  * // predefined data
      return new Promise<DatePeriod[]>(function (resolve, reject) {
      return resolve([new DatePeriod('12:00', '15:00', 'test')]);
    });
  */

  getPeriods(filters: Object = {}): Promise<DatePeriod[]> {
    return this.getList(filters).then(response => response.data as DatePeriod[]);
  }

  save (datePeriod: DatePeriod): Promise<DatePeriod> {
    const action = datePeriod.id ? this.put(datePeriod.id, datePeriod) : this.store(datePeriod);
    return action.then(response => response.data as DatePeriod);
  }
}
