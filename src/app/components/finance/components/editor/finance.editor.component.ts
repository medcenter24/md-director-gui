/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Doctor, DoctorsService } from '../../../doctors';
import { HospitalsService } from '../../../hospital';
import { FinanceRule } from '../../finance.rule';
import { FinanceService } from '../../finance.service';
import { Assistant, AssistantsService } from '../../../assistant';
import { CitiesService } from '../../../city';
import { PeriodService } from '../../../period';
import { NumbersHelper } from '../../../../helpers/numbers.helper';
import { ServicesService } from '../../../service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalState } from '../../../../global.state';
import { FinanceCurrencyService } from '../currency/finance.currency.service';

@Component({
  selector: 'nga-finance-editor',
  templateUrl: './finance.editor.html',
  styleUrls: ['./finance.editor.scss'],
})
export class FinanceEditorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'FinanceEditorComponent';

  rule: FinanceRule = new FinanceRule();

  isLoaded: boolean = false;

  /**
   * add, sub
   */
  financeTypes: any[] = [];

  /**
   * doctor, accident
   */
  conditionModels: any[] = [];

  constructor(
    protected financeService: FinanceService,
    public doctorService: DoctorsService,
    public cityService: CitiesService,
    public assistantService: AssistantsService,
    public periodService: PeriodService,
    public servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    public currencyService: FinanceCurrencyService,
    public hospitalService: HospitalsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Finance' });
        const id = +params[ 'id' ];
        this.initTypes();
        this.initModels();
        if (id) {
          this.startLoader();
          this.financeService.getFinanceRule(id).then((financeRule: FinanceRule) => {
            this.stopLoader();
            this.rule = financeRule;
            this.isLoaded = true;
          }).catch(() => this.stopLoader());
        } else {
            this.isLoaded = true;
        }
      });
  }

  private initTypes(): void {
    const postfix = 'TypesLang';
    this.startLoader(postfix);
    this.translateService.get('Yes').subscribe(() => {
      this.financeTypes = [];
      this.financeTypes.push({ label: this.translateService.instant('Add'), value: 'add' });
      this.financeTypes.push({ label: this.translateService.instant('Subtract'), value: 'sub' });

      this.stopLoader(postfix);

      if (!this.rule.type) {
        this.rule.type = 'add';
      }
    });
  }

  private initModels(): void {
    const postfix = 'ModelsLang';
    this.startLoader(postfix);
    this.translateService.get('Yes').subscribe(() => {
      this.conditionModels = [];

      // condition for the assistant company
      this.conditionModels.push({
        label: this.translateService.instant('Assistant'),
        desc: this.translateService.instant('Invoice the assistant'), // how much assistant needs to pay
        value: 'App\\Assistant',
      });

      // condition for the doctor
      this.conditionModels.push({
        label: this.translateService.instant('Doctor'),
        desc: this.translateService.instant('Doctor remuneration'),
        value: 'App\\Doctor',
      });

      this.stopLoader(postfix);

      if (!this.rule.model) {
        this.rule.model = 'App\\Assistant';
      }
    });
  }

  saveFinanceRule(): void {
    const postfix = 'SaveRule';
    this.startLoader(postfix);
    this.financeService.save(this.rule)
      .then(rule => {
        this.stopLoader(postfix);
        if (!this.rule || !this.rule.id) {
          this.router.navigate([`pages/finance/conditions/${rule.id}`]);
        } else {
          this.rule = rule;
        }
      })
      .catch(() => {
        this.stopLoader(postfix);
      });
  }

  deleteFinanceRule(): void {
    const postfix = 'DeleteRule';
    this.startLoader(postfix);
    this.financeService.destroy(this.rule)
      .then(() => {
        this.stopLoader(postfix);
        this.router.navigate([`pages/finance/conditions`]);
      })
      .catch(() => {
        this.stopLoader(postfix);
      });
  }

  canBeSaved () {
    return FinanceRule.canBeSaved(this.rule);
  }

  onPriceAmountChanged(event): void {
    const val = event.target.value;
    this.rule.value = event.target.value = FinanceEditorComponent.convertPriceAmount(val);
  }

  priceAmountToFixed(event): void {
    this.rule.value = event.target.value = FinanceEditorComponent.convertPriceAmount(event.target.value, true);
  }

  private static convertPriceAmount(amount: string = '', toFixed: boolean = false): number {
    let result = null;
    if (amount !== '') {
      result = NumbersHelper.getFixedFloat(amount, true, toFixed);
    }
    return result;
  }
}
