/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AccidentCheckpointsComponent } from './components/checkpoints/checkpoints.component';
import { AccidentFinanceComponent } from './components/finance/finance.component';
import { SettingsComponent } from './settings.component';
import { PeriodListComponent } from '../../components/period/components/list/period.list.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'checkpoints', component: AccidentCheckpointsComponent },
      { path: 'finance', component: AccidentFinanceComponent },
      { path: 'periods', component: PeriodListComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
