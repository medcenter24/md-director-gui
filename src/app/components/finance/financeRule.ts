/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { User } from '../users/user';
import { Assistant } from '../assistant/assistant';
import { City } from '../city/city';
import { Doctor } from '../doctors/doctor';
import { Service } from '../service/service';
import { DatePeriod } from '../datePeriod/datePeriod';

export class FinanceRule {
  constructor(
    public id: number = 0,
    public createdBy: User = null,
    public title: string = '', // if I need to determine context
    public assistant: Assistant = null,
    public city: City = null,
    public doctor: Doctor = null,
    public services: Service[] = null,
    /**
     * from string - formatted string
     * example:
     *    from 'sat 00:00' to 'sun 23:59' # weekend rule
     *    from '21:00' to '6:00' # night rule
     *    # everything other - it is a day rule
     */
    public datePeriod: DatePeriod = new DatePeriod(),
    public priceAmount: number = null,
  ) { }
}
