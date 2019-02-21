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
      this.reload(this.types);
    });
  }

  /**
   * Getting new Finances from the server
   * @param types [income, assistant, caseable]
   */
  private reload(types: string[] = []): void {
    this.caseService.getFinance(this.accident, { types }).then((paymentViewers: PaymentViewer[]) => {
      this.updatePaymentViewers(paymentViewers);
    });
  }

  private save(type: string, data: Object): void {
    this.caseService.saveFinance(this.accident, type, data).then((paymentViewers: PaymentViewer[]) => {
      this.updatePaymentViewers(paymentViewers);
    });
  }

  private updatePaymentViewers(paymentViewers: PaymentViewer[]): void {
    paymentViewers.forEach((pView: PaymentViewer) => {
      const viewerKey = this.paymentViewers.findIndex((view: PaymentViewer) => view.type === pView.type);
      this.paymentViewers[viewerKey] = pView;
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

  onReload(type: string): void {
    this.reload([type]);
  }

  reloadPayments(types: string[]): void {
    this.reload(types);
  }

  onUpdate(type, data): void {
    this.save(type, data);
  }
}
