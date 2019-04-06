/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
