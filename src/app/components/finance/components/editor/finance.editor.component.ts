/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { LoadingComponent } from '../../../core/components/componentLoader';
import { Doctor } from '../../../doctors';
import { FinanceRule } from '../../financeRule';
import { FinanceService } from '../../finance.service';
import { Assistant } from '../../../assistant';
import { City } from '../../../city/city';
import { Period } from '../../../period';
import { NumbersHelper } from '../../../../helpers/numbers.helper';

@Component({
  selector: 'nga-finance-editor',
  templateUrl: './finance.editor.html',
  styleUrls: ['./finance.editor.scss'],
})
export class FinanceEditorComponent extends LoadingComponent {
  protected componentName: string = 'AccidentFinanceComponent';

  rule: FinanceRule;

  constructor(
    protected _logger: Logger,
    protected loadingBar: SlimLoadingBarService,
    protected _state: GlobalState,
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
        return this.rule.datePeriod && this.rule.datePeriod.title !== '';
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

  onTitleChanged(event): void {
    this.rule.title = event.target.value;
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

  onDatePeriodChanged(period: Period): void {
    this.rule.datePeriod = period;
  }

  priceAmountToFixed(event): void {
    this.rule.priceAmount = event.target.value = this.convertPriceAmount(event.target.value, true);
  }

  private convertPriceAmount(amount: string = '', toFixed: boolean = false): number {
    let result = null;
    if (amount !== '') {
      result = NumbersHelper.getFixedFloat(amount, true, toFixed);
    }
    return result;
  }
}
