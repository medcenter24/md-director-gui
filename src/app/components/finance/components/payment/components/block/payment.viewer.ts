/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */
import { FinanceCurrency } from '../../../currency/finance.currency';
import { FinancePayment } from '../../finance.payment';

export class PaymentViewer {
  constructor(
    public type: string = '', // identifier of the payment viewer type
    public loading: boolean = false, // process
    public payment: FinancePayment = null,
    // this is not a payment, this is result of calculation from the backend
    public calculatedValue: number = 0, // price amount
    public currency: FinanceCurrency = null,
    public formula: string = '', // calculation formula
  ) { }
}
