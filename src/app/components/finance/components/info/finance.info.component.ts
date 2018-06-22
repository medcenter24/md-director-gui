/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { FinanceRule } from '../../financeRule';

@Component({
  selector: 'nga-finance-info',
  templateUrl: './finance.info.html',
})
export class FinanceInfoComponent extends LoadableComponent {
  protected componentName: string = 'FinanceInfoComponent';

  @Input() financeRule: FinanceRule = new FinanceRule();

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
        return !!this.financeRule.doctors.length;
      case 'assistants':
        return !!this.financeRule.assistants.length;
      case 'datePeriods':
        return !!this.financeRule.datePeriods.length;
      case 'services':
        return !!this.financeRule.services.length;
      case 'cities':
        return !!this.financeRule.cities.length;
    }
    return false;
  }

  hasPrice () {
    return this.financeRule.priceAmount || this.financeRule.priceAmount === 0;
  }
}
