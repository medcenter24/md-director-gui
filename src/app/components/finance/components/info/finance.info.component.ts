/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { FinanceRule } from '../../finance.rule';
import { FinanceCurrency } from '../currency/finance.currency';

@Component({
  selector: 'nga-finance-info',
  templateUrl: './finance.info.html',
})
export class FinanceInfoComponent extends LoadableComponent {
  protected componentName: string = 'FinanceInfoComponent';

  _financeRule: FinanceRule = new FinanceRule();

  /**
   * Cache for currencies
   */
  currencies: FinanceCurrency[] = null;

  @Input() set financeRule (financeRule: FinanceRule) {
    this._financeRule = financeRule;
  }

  hasConditions () {
    return this.hasCondition('assistants')
      || this.hasCondition('doctors')
      || this.hasCondition('datePeriods')
      || this.hasCondition('services')
      || this.hasCondition('cities');
  }

  hasCondition (conditionName): boolean {
    switch (conditionName) {
      case 'doctors':
        return !!this._financeRule.doctors.length;
      case 'assistants':
        return !!this._financeRule.assistants.length;
      case 'datePeriods':
        return !!this._financeRule.datePeriods.length;
      case 'services':
        return !!this._financeRule.services.length;
      case 'cities':
        return !!this._financeRule.cities.length;
    }
    return false;
  }

  hasCurrency () {
    return this._financeRule.value > 0
      && (this._financeRule.currencyMode === 'percent' || this._financeRule.currencyId);
  }
}
