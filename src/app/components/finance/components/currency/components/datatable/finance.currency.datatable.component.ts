/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../../../global.state';
import { LoadingComponent } from '../../../../../core/components/componentLoader';
import {
  DatatableAction,
  DatatableCol,
  DatatableComponent,
  DatatableConfig,
  DatatableTransformer,
} from '../../../../../ui/datatable';
import { FinanceCurrency } from '../../finance.currency';
import { FinanceCurrencyService } from '../../finance.currency.service';

@Component({
  selector: 'nga-currency-datatable',
  templateUrl: './finance.currency.datatable.html',
})
export class FinanceCurrencyDatatableComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'FinanceCurrencyDatatableComponent';

  @ViewChild('datatable')
    private datatable: DatatableComponent;

  displayDialog: boolean;
  langLoaded: boolean = false;
  datatableConfig: DatatableConfig;

  currency: FinanceCurrency;

  constructor(
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private financeCurrencyService: FinanceCurrencyService,
  ) {
    super();
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.financeCurrencyService.search(filters);
        },
        cols: [
          new DatatableCol('title', this.translateService.instant('Title')),
          new DatatableCol('code', this.translateService.instant('Code')),
          new DatatableCol('ico', this.translateService.instant('Icon')),
          new DatatableCol('ico_preview', this.translateService.instant('Icon Preview')),
        ],
        transformers: [
          new DatatableTransformer('ico_preview', (f, row: FinanceCurrency) => `<span class="${row.ico}"></span>`),
        ],
        refreshTitle: this.translateService.instant('Refresh'),
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
            this.showDialogToAdd();
          }),
        ],
        onRowSelect: event => {
          this.onRowSelect(event);
        },
        sortBy: 'title',
      });
    });
  }

  showDialogToAdd() {
    this.setObject(new FinanceCurrency());
    this.displayDialog = true;
  }

  private setObject(currency: FinanceCurrency = null): void {
    this.currency = currency;
  }

  save() {
    const postfix = 'Save';
    this.startLoader(postfix);
    this.financeCurrencyService.save(this.currency)
      .then(() => {
        this.stopLoader(postfix);
        this.setObject();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.stopLoader(postfix);
      });
  }

  onRowSelect(event) {
    this.setObject(this.cloneObject(event.data));
    this.displayDialog = true;
  }

  cloneObject(o: FinanceCurrency): FinanceCurrency {
    const currency = new FinanceCurrency();
    for (const prop of Object.keys(o)) {
      currency[prop] = o[prop];
    }
    return currency;
  }

  delete() {
    this.startLoader(`${this.componentName}Delete`);
    this.financeCurrencyService.destroy(this.currency)
      .then(() => {
        this.stopLoader(`${this.componentName}Delete`);
        this.setObject();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.stopLoader(`${this.componentName}Delete`);
      });
  }
}
