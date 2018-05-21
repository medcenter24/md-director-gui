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
import { DatatableAction, DatatableCol } from '../../../ui/datatable';
import { ConfirmationService } from 'primeng/api';

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
  ) {
    super(translateService);
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
      new DatatableCol('description', this.translateService.instant('Description')),
    ];
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
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
