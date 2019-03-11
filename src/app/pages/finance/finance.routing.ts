/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FinanceCurrencyDatatableComponent } from '../../components/finance/components/currency/components/datatable';
import { FinanceDatatableComponent } from '../../components/finance/components/datatable';
import { ConditionsEditorPageComponent } from './conditions/editor';
import { FinanceComponent } from './finance.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      { path: 'conditions', component: FinanceDatatableComponent },
      { path: 'conditions/new', component: ConditionsEditorPageComponent },
      { path: 'conditions/:id', component: ConditionsEditorPageComponent },
      { path: 'currencies', component: FinanceCurrencyDatatableComponent },
      // todo make it like a cities done
      // { path: 'currencies/new', component: ConditionsEditorPageComponent },
      // { path: 'currencies/:id', component: ConditionsEditorPageComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

