/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinanceCurrency } from '../../../currency/finance.currency';

@Component({
  selector: 'nga-payment-block',
  templateUrl: './payment.block.html',
  styleUrls: ['payment.block.scss'],
})
export class PaymentBlockComponent {

  @Output() fixed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() title: string;
  @Input() set theme(theme) {
    const found = this.themes.find(e => e.title === theme);
    this.currentTheme = found ? found : this.themes.find(e => e.title === 'default');
  }
  @Input() priceAmount: number = 0;
  @Input() currency: FinanceCurrency;
  @Input() formula: string = '';

  showFormula: boolean = false;
  themes: any[] = [{
    title: 'default',
    bodyText: 'text-secondary',
    border: 'border-secondary',
  }, {
    title: 'success',
    bodyText: 'text-success',
    border: 'border-success',
  }, {
    title: 'info',
    bodyText: 'text-info',
    border: 'border-info',
  }];
  currentTheme: string = 'default';

  onAutoupdateChanged(event): void {
    this.fixed.emit(event);
  }

  toggleFormula(): void {
    this.showFormula = !this.showFormula;
  }

}
