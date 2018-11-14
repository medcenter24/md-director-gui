/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Assistant } from '../assistant';
import { City } from '../city';
import { Doctor } from '../doctors';
import { Hospital } from '../hospital';
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
    public hospitals: Hospital[] = [],
    /**
     * from string - formatted string
     * example:
     *    from 'sat 00:00' to 'sun 23:59' # weekend rule
     *    from '21:00' to '6:00' # night rule
     *    # everything other - it's a day rule
     */
    public datePeriods: Period[] = [],
    public value: number = null,
    public currencyId: number = 0, // sub or add value in the currency value (from the FinanceCurrency)
    public currencyMode: string = 'currency', // currency, percent mode
    public type: string = 'add', // add, subtract (+ -)
    public model: string = 'App\\Accident', // Doctor::class, Accident::class
  ) { }

  static canBeSaved(rule: FinanceRule): boolean {
    const res = rule.value > 0 // no reason to save 0 - do nothing ?
      && rule.title
      && (rule.currencyMode === 'percent' || rule.currencyId)
      && rule.model;

    return !!res;
  }
}
