/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { FinanceService } from '../../finance.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { FinanceRule } from '../../financeRule';
import { DatatableAction, DatatableCol, DatatableTransformer } from '../../../ui/datatable';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-finance-datatable',
  templateUrl: './finance.datatable.html',
})
export class FinanceDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'FinanceDatatableComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private financeService: FinanceService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {
    super();
  }

  getService(): LoadableServiceInterface {
    return this.financeService;
  }

  getEmptyModel(): Object {
    return new FinanceRule();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('condition', this.translateService.instant('Condition')),
      new DatatableCol('priceAmount', this.translateService.instant('Price')),
    ];
  }

  getTransformers(): DatatableTransformer[] {
    return [
        new DatatableTransformer('condition', (val, row: FinanceRule) => {
            let res: string[] = [];
            res.push(this.conditionToString(row, 'assistants', 'title'));
            res.push(this.conditionToString(row, 'cities', 'title'));
            res.push(this.conditionToString(row, 'doctors', 'name'));
            res.push(this.conditionToString(row, 'services', 'title'));
            res.push(this.conditionToString(row, 'datePeriods', 'title'));

            res = res.filter(value => value.length > 0);
            return res.join(', ');
        }),
    ];
  }

  private conditionToString(rule: FinanceRule, key: string, title: string): string {
    let res: string = '';
    if (rule[key].length > 0) {
      res = `${this.translateService.instant(key)}:
        ${rule[key].length === 1 ? rule[key][0][title] : rule[key].length}`;
    }
    return res;
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.router.navigate(['pages/settings/finance/new']);
      }),
    ];
  }

  protected onRowSelect(event): void {
    this.router.navigate([`pages/settings/finance/${event.data.id}`]);
  }

  getSortBy(): string {
    return 'title';
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('Are you sure that you want to perform this action?'),
      accept: () => {
        this.delete();
      },
    });
  }
}
