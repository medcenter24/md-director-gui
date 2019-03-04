/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinanceCurrency } from '../../../currency/finance.currency';
import { PaymentBlockTheme } from './payment.block.theme';

@Component({
  selector: 'nga-payment-block',
  templateUrl: './payment.block.html',
  styleUrls: ['payment.block.scss'],
})
export class PaymentBlockComponent {
  @Input() title: string;
  @Input() set theme(theme) {
    const found = this.themes.find(e => e.title === theme);
    this.currentTheme = found ? found : this.themes.find(e => e.title === 'default');
  }
  @Input() set loading(status) {
    this.updating = status;
  }
  @Input() set priceAmount(amount) {
    this.storedPrice = +amount;
    this.changingPrice = +amount;
  }
  @Input() currency: FinanceCurrency;
  @Input() formula: string = '';
  @Input() set isFixed (fix) {
    this.isFixedChanging = fix;
    this.isFixedStored = fix;
  }

  // process reload of the data for this block
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();
  @Output() update: EventEmitter<Object> = new EventEmitter<Object>();

  // to check if was changed
  storedPrice: number = 0;
  // to change this price until saved
  changingPrice: number = 0;

  isFixedChanging: boolean = false;
  isFixedStored: boolean = false;

  hasChanges: boolean = false;
  updating: boolean = false;
  showFormula: boolean = false;
  themes: PaymentBlockTheme[] = [
    new PaymentBlockTheme('default', 'text-secondary', 'border-secondary'),
    new PaymentBlockTheme('success', 'text-success', 'border-success'),
    new PaymentBlockTheme('info', 'text-info', 'border-info'),
  ];
  currentTheme: PaymentBlockTheme = this.themes[0];

  onAutoupdateChanged(): void {
    this.dataChanged();
  }

  toggleFormula(): void {
    this.showFormula = !this.showFormula;
  }

  reloadDetails(): void {
    this.updating = true;
    this.reload.emit();
  }

  save(): void {
    if (this.hasChanges) {
      this.updating = true;
      this.update.emit({
        price: this.changingPrice,
        fixed: this.isFixedChanging,
      });
    }
  }

  onPriceChanged(): void {
    this.changingPrice = Number(this.changingPrice);
    this.dataChanged();
  }

  private dataChanged(): void {
    this.hasChanges = this.changingPrice !== this.storedPrice || this.isFixedChanging !== this.isFixedStored;
  }

}
