/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Accident } from '../../../accident/accident';
import { TranslateService } from '@ngx-translate/core';
import { PaymentViewer } from '../../../finance/components/payment/components/block/payment.viewer';
import { CasesService } from '../../cases.service';

@Component({
  selector: 'nga-case-finance',
  templateUrl: './case.finance.html',
  styleUrls: ['./case.finance.scss'],
})
export class CaseFinanceComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'CaseFinanceComponent';

  @Input() accident: Accident;

  types: string[] = ['income', 'assistant', 'caseable'];
  paymentViewers: PaymentViewer[] = [];

  constructor(
    private translate: TranslateService,
    private caseService: CasesService,
  ) {
    super();
  }

  ngOnInit() {
    this.translate.get('Yes').subscribe(() => {
      this.types.forEach(type => {
        this.paymentViewers.push(new PaymentViewer(type, true));
      });
      this.recalculateFinance(this.types);
    });
  }

  /**
   * Getting new Finances from the server
   * @param types [income, assistant, caseable]
   */
  recalculateFinance(types: string[] = []): void {
    this.caseService.getFinance(this.accident, { types }).then((resp: PaymentViewer[]) => {
      types.forEach(type => {
        const viewerKey = this.paymentViewers.findIndex(view => view.type === type);
        const responseKey = resp.findIndex((res: PaymentViewer) => res.type === type);
        this.paymentViewers[viewerKey] = resp[responseKey];
        this.paymentViewers[viewerKey].loading = false;
        this.paymentViewers[viewerKey].type = type;
      });
    });
  }

  getTitle(type: string): string {
    switch (type) {
      case 'income':
        return 'Income';
      case 'caseable':
        return this.accident.caseableType === 'App\\HospitalAccident'
          ? 'Payment to the hospital'
          : 'Payment to the doctor';
      case 'assistant':
        return 'Payment from the assistant';
      default: return `Undefined payment type ${type}`;
    }
  }

  update(type): void {
    this.recalculateFinance([type]);
  }


}
