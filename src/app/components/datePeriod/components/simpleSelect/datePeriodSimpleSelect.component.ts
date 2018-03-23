/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { DatePeriod } from '../../datePeriod';

@Component({
  selector: 'nga-date-period-simple-select',
  templateUrl: './datePeriodSimpleSelect.html',
})
export class DatePeriodSimpleSelectComponent extends LoadableComponent {
  protected componentName: string = 'DatePeriodSimpleSelectComponent';

  @Output() selected: EventEmitter<DatePeriod> = new EventEmitter<DatePeriod>();

  selectPeriod(event): void {
    let period;
    switch (event.target.value) {
      case 'day':
        period = new DatePeriod('6:00', '21:59', event.target.value);
        break;
      case 'night':
        period = new DatePeriod('22:00', '5:59', event.target.value);
        break;
      case 'weekend':
        period = new DatePeriod('sat 00:00', 'sun 23:59', event.target.value);
        break;
    }

    this.selected.emit(period);
  }

}
