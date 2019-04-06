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

import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http/http.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { FinanceCurrency } from './finance.currency';

@Injectable()
export class FinanceCurrencyService extends HttpService implements LoadableServiceInterface {
  protected getPrefix (): string {
    return 'director/currency';
  }

  create(currency: FinanceCurrency): Promise<FinanceCurrency> {
    return this.store(currency);
  }

  save (currency: FinanceCurrency): Promise<FinanceCurrency> {
    const action = currency.id ? this.put(currency.id, currency) : this.store(currency);
    return action.then(response => response.data as FinanceCurrency);
  }

  destroy (currency: FinanceCurrency): Promise<any> {
    return this.remove(currency.id);
  }
}
