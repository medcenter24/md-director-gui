/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */
import { FinanceCurrency } from '../../../currency/finance.currency';

export class PaymentViewer {
  constructor(
    public type: string = '', // identifier of the payment viewer type
    public loading: boolean = false, // process
    public value: number = 0, // price amount
    public currency: FinanceCurrency = null,
    public formula: string = '', // calculation formula
  ) { }
}
