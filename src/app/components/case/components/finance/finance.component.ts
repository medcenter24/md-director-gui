/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { ToggleButton } from 'primeng/primeng';
import { Accident } from '../../../accident/accident';
import { TranslateService } from '@ngx-translate/core';
import { NumbersHelper } from '../../../../helpers/numbers.helper';

@Component({
  selector: 'nga-case-finance',
  templateUrl: './finance.html',
})
export class CaseFinanceComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'CaseFinanceComponent';

  @Input() accident: Accident;

  @ViewChild('incomeAutoupdate')
    private incomeAutoupdate: ToggleButton;

  totalAmount: number = 0;
  totalIncome: number = 0;
  totalIncomeFormula: string = '';

  constructor(
    private translate: TranslateService,
    private numbersHelper: NumbersHelper,
  ) {
    super();
  }

  ngOnInit() {
    this.translate.get('Without discount').subscribe(res => {
      this.totalIncomeFormula = res;
    });
    this.recalculatePrice();
  }

  /**
   * Set income state: auto count or fixed value
   * @param {boolean} val
   */
  setFixedIncome(val: boolean): void {
    this.accident.fixed_income = val ? 1 : 0;
    this.incomeAutoupdate.checked = !val;
  }

  /**
   * Checks if income is fixed
   * @returns {boolean}
   */
  private isIncomeFixed(): boolean {
    return +this.accident.fixed_income !== 0;
  }

  /**
   * on changing could be hidden price on save price will be updated from the backend
   * it doesn't have any sense to implement this on frontend, all calculations go to the backend
   */
  private recalculatePrice(): void {
    // do nothing if everything is fixed
/*    if (this.isIncomeFixed()) {
      this.totalIncomeFormula = this.translate.instant('Income is fixed allowed changes by hand');
      return;
    }

    this.totalIncome = 0;
    if (this.totalAmount && this.discountType && this.discountValue) {
      if (this.discountType.operation === '%') {
        // *
        this.totalIncome = this.totalAmount - this.discountValue * this.totalAmount / 100 - this.accident.caseable_cost;
        this.totalIncomeFormula = `${this.totalAmount} - ${this.discountValue} * ${this.totalAmount}
          / 100 - ${this.accident.caseable_cost}`;
      } else if (this.discountType.operation === 'EUR') {
        // -
        this.totalIncome = this.totalAmount - this.discountValue - this.accident.caseable_cost;
        this.totalIncomeFormula = `${this.totalAmount} - ${this.discountValue} - ${this.accident.caseable_cost}`;
      } else {
        this._logger.warn(`Undefined discount type: ${this.discountType.operation}`);
        this.totalIncome = this.totalAmount;
        this.totalIncomeFormula = this.translate.instant('Without discount');
      }
    } else {
      this.totalIncome = this.totalAmount - this.accident.caseable_cost;
      this.totalIncomeFormula = `this.totalAmount - ${this.accident.caseable_cost}`;
    }

    this.totalIncome = +this.totalIncome.toFixed(2);
    this.totalAmount = +this.totalAmount.toFixed(2);*/
  }

  onIncomeAutoupdateChanged(event): void {
    this.setFixedIncome(!event.checked);
    this.recalculatePrice();
  }

  onDoctorFeeChanged(event): void {
    this.accident.caseable_cost = this.numbersHelper.getFixedFloat(event.target.value);
    this.recalculatePrice();
  }

  onTotalIncomeChanged(event): void {
    this.totalIncome = this.numbersHelper.getFixedFloat(event.target.value);
    this.setFixedIncome(true);
    this.recalculatePrice();
  }

/*  onDiscountTypeSelected(discountType: Discount): void {
    this.discountType = discountType;
    this.recalculatePrice();
  }

  onDiscountValueChanged(): void {
    this.discountValue = +this.discountValue.toFixed(2);
    this.recalculatePrice();
  }*/

}
