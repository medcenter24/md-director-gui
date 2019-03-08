/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FinanceCurrencyDatatableModule } from '../../components/finance/components/currency/components/datatable';
import { FinanceDatatableModule } from '../../components/finance/components/datatable';
import { ConditionsEditorPageModule } from './conditions/editor';
import { FinanceComponent } from './finance.component';
import { routing } from './finance.routing';

@NgModule({
  imports: [
    routing,
    FinanceDatatableModule,
    FinanceCurrencyDatatableModule,
    ConditionsEditorPageModule,
  ],
  declarations: [
    FinanceComponent,
  ],
})

export class FinanceModule {
}
