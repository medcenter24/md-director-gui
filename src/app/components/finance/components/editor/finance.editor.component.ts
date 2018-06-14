/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Doctor, DoctorsService } from '../../../doctors';
import { FinanceRule } from '../../financeRule';
import { FinanceService } from '../../finance.service';
import { Assistant, AssistantsService } from '../../../assistant';
import { CitiesService, City } from '../../../city';
import { Period, PeriodService } from '../../../period';
import { NumbersHelper } from '../../../../helpers/numbers.helper';
import { ServicesService } from '../../../service';

@Component({
  selector: 'nga-finance-editor',
  templateUrl: './finance.editor.html',
  styleUrls: ['./finance.editor.scss'],
})
export class FinanceEditorComponent extends LoadableComponent {
  protected componentName: string = 'AccidentFinanceComponent';

  rule: FinanceRule;

  constructor(
    protected financeService: FinanceService,
    public doctorService: DoctorsService,
    public cityService: CitiesService,
    public assistantService: AssistantsService,
    public periodService: PeriodService,
    public servicesService: ServicesService,
  ) {
    super();
    this.rule = new FinanceRule();
  }

  saveFinanceRule(): void {
    const postfix = 'saveRule';
    this.startLoader(postfix);
    this.financeService.create(this.rule)
      .then(() => this.stopLoader(postfix))
      .catch(() => this.stopLoader(postfix));
  }

  hasPrice () {
    return this.rule.priceAmount || this.rule.priceAmount === 0;
  }

  onTitleChanged(event): void {
    this.rule.title = event.target.value;
  }

  onAssistantsChanged(assistants: Assistant[]): void {
    this.rule.assistants = assistants;
  }

  onDoctorsChanged (doctors: Doctor[]): void {
    this.rule.doctors = doctors;
  }

  onCitiesChanged (cities: City[]): void {
    this.rule.cities = cities;
  }

  onPriceAmountChanged(event): void {
    const val = event.target.value;
    this.rule.priceAmount = event.target.value = FinanceEditorComponent.convertPriceAmount(val);
  }

  onServicesChanged(event): void {
    this.rule.services = event;
  }

  onPeriodsChanged(periods: Period[]): void {
    this.rule.datePeriods = periods;
  }

  priceAmountToFixed(event): void {
    this.rule.priceAmount = event.target.value = FinanceEditorComponent.convertPriceAmount(event.target.value, true);
  }

  private static convertPriceAmount(amount: string = '', toFixed: boolean = false): number {
    let result = null;
    if (amount !== '') {
      result = NumbersHelper.getFixedFloat(amount, true, toFixed);
    }
    return result;
  }
}
