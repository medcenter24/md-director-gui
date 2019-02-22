/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

export class FinancePayment {
  constructor (
    public id: number = 0,
    public createdBy: number = 0,
    public value: number = 0,
    public currencyId: number = 0,
    public fixed: boolean = false,
    public description: string = '',
  ) { }
}
