/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { ToggleButton } from 'primeng/primeng';
import { Accident } from '../../../accident/accident';
import { TranslateService } from '@ngx-translate/core';
import { NumbersHelper } from '../../../../helpers/numbers.helper';

@Component({
  selector: 'nga-case-finance',
  templateUrl: './case.finance.html',
  styleUrls: ['./case.finance.scss'],
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
  ) {
    super();
  }

  ngOnInit() {
    /*this.translate.get('Without discount').subscribe(res => {
      this.totalIncomeFormula = res;
    });*/
    this.recalculatePrice();
  }

  /**
   * Set income state: auto count or fixed value
   * @param {boolean} val
   */
  setFixedIncome(val: boolean): void {
    this.accident.fixedIncome = val ? 1 : 0;
    this.incomeAutoupdate.checked = !val;
  }

  /**
   * Checks if income is fixed
   * @returns {boolean}
   */
  private isIncomeFixed(): boolean {
    return +this.accident.fixedIncome !== 0;
  }

  /**
   * on changing could be hidden price on save price will be updated from the backend
   * it doesn't have any sense to implement this on frontend, all calculations go to the backend
   */
  private recalculatePrice(): void {
    // all finance operations are managed by backend
  }

  onIncomeAutoupdateChanged(event): void {
    this.setFixedIncome(!event.checked);
    this.recalculatePrice();
  }

  onDoctorFeeChanged(event): void {
    this.accident.caseableCost = NumbersHelper.getFixedFloat(event.target.value);
    this.recalculatePrice();
  }

  onTotalIncomeChanged(event): void {
    this.totalIncome = NumbersHelper.getFixedFloat(event.target.value);
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
