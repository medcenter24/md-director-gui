/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { LoadingComponent } from '../../../../components/core/components/componentLoader/LoadingComponent';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { NumbersHelper } from '../../../../helpers/numbers.helper';
import { Doctor } from '../../../../components/doctors/doctor';
import { Assistant } from '../../../../components/assistant/assistant';
import { City } from '../../../../components/city/city';
import { FinanceService } from '../../../../components/finance/finance.service';
import { FinanceRule } from '../../../../components/finance/financeRule';
import { DatePeriod } from '../../../../components/datePeriod/datePeriod';

@Component({
  selector: 'nga-accident-finance',
  templateUrl: './finance.html',
  styleUrls: ['./finance.scss'],
})
export class AccidentFinanceComponent extends LoadingComponent {
  protected componentName: string = 'AccidentFinanceComponent';

  rule: FinanceRule;

  constructor(
    protected _logger: Logger,
    protected loadingBar: SlimLoadingBarService,
    protected _state: GlobalState,
    protected numbersHelper: NumbersHelper,
    protected financeService: FinanceService,
  ) {
    super();
    this.rule = new FinanceRule();
  }

  saveFinanceRule(): void {
    this.financeService.create(this.rule);
  }

  hasConditions () {
    return this.hasCondition('assistant')
      || this.hasCondition('doctor')
      || this.hasCondition('datePeriod')
      || this.hasCondition('service')
      || this.hasCondition('city');
  }

  hasCondition (conditionName): boolean {

    switch (conditionName) {
      case 'doctor':
        return !!this.rule.doctor;
      case 'assistant':
        return !!this.rule.assistant;
      case 'datePeriod':
        return this.rule.datePeriod && this.rule.datePeriod.key !== '';
      case 'service':
        return !!this.rule.services;
      case 'city':
        return !!this.rule.city;
    }
    return false;
  }

  hasPrice () {
    return this.rule.priceAmount || this.rule.priceAmount === 0;
  }

  onAssistantChanged(assistant: Assistant): void {
    this.rule.assistant = assistant;
  }

  onDoctorChanged (doctor: Doctor): void {
    this.rule.doctor = doctor;
  }

  onCityChanged (city: City): void {
    this.rule.city = city;
  }

  onPriceAmountChanged(event): void {
    const val = event.target.value;
    this.rule.priceAmount = event.target.value = this.convertPriceAmount(val);
  }

  onServicesChanged(event): void {
    this.rule.services = event;
  }

  onDatePeriodChanged(datePeriod: DatePeriod): void {
    this.rule.datePeriod = datePeriod;
  }

  priceAmountToFixed(event): void {
    this.rule.priceAmount = event.target.value = this.convertPriceAmount(event.target.value, true);
  }

  private convertPriceAmount(amount: string = '', toFixed: boolean = false): number {
    let result = null;
    if (amount !== '') {
      result = this.numbersHelper.getFixedFloat(amount, true, toFixed);
    }
    return result;
  }
}
