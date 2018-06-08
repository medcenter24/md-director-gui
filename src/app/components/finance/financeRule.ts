/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Assistant } from '../assistant';
import { City } from '../city';
import { Doctor } from '../doctors';
import { Service } from '../service';
import { Period } from '../period';

export class FinanceRule {
  constructor(
    public id: number = 0,
    public title: string = '',
    public assistants: Assistant[] = [],
    public cities: City[] = [],
    public doctors: Doctor[] = [],
    public services: Service[] = [],
    /**
     * from string - formatted string
     * example:
     *    from 'sat 00:00' to 'sun 23:59' # weekend rule
     *    from '21:00' to '6:00' # night rule
     *    # everything other - it is a day rule
     */
    public datePeriods: Period[] = [],
    public priceAmount: number = null,
  ) { }
}
