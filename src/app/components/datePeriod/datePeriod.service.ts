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

  getPeriods(): Promise<DatePeriod[]> {
    return new Promise<DatePeriod[]>(function (resolve, reject) {
      return resolve([new DatePeriod('12:00', '15:00', 'test')]);
    });
  }
}
