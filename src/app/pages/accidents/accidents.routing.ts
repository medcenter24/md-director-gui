/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AccidentsComponent } from './accidents.component';
import { AccidentCheckpointsComponent } from './components/checkpoints/checkpoints.component';
import { AccidentFinanceComponent } from './components/finance/finance.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AccidentsComponent,
    children: [
      { path: 'checkpoints', component: AccidentCheckpointsComponent },
      { path: 'finance', component: AccidentFinanceComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
