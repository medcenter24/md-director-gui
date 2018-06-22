/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Doctor, DoctorsService } from '../../../doctors';
import { FinanceRule } from '../../financeRule';
import { FinanceService } from '../../finance.service';
import { Assistant, AssistantsService } from '../../../assistant';
import { CitiesService, City } from '../../../city';
import { Period, PeriodService } from '../../../period';
import { NumbersHelper } from '../../../../helpers/numbers.helper';
import { ServicesService } from '../../../service';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'nga-finance-editor',
  templateUrl: './finance.editor.html',
  styleUrls: ['./finance.editor.scss'],
})
export class FinanceEditorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'FinanceEditorComponent';

  rule: FinanceRule;

  isLoaded: boolean = false;

  constructor(
    protected financeService: FinanceService,
    public doctorService: DoctorsService,
    public cityService: CitiesService,
    public assistantService: AssistantsService,
    public periodService: PeriodService,
    public servicesService: ServicesService,
    private route: ActivatedRoute,
    protected _state: GlobalState,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Finance' });
        const id = +params[ 'id' ];
        if (id) {
          this.startLoader();
          this.financeService.getFinanceRule(id).then((financeRule: FinanceRule) => {
            this.stopLoader();
            this.rule = financeRule;
            this.isLoaded = true;
          }).catch(() => this.stopLoader());
        } else {
            this.rule = new FinanceRule();
            this.isLoaded = true;
        }
      });
  }

  saveFinanceRule(): void {
    const postfix = 'saveRule';
    this.startLoader(postfix);
    this.financeService.save(this.rule)
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
