/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AccidentsComponent } from './accidents.component';
import { AccidentCheckpointsComponent } from './components/checkpoints/checkpoints.component';
import { AccidentStatusesComponent } from './components/statuses/statuses.component';
import { AccidentTypesComponent } from './components/types/types.component';
import { AccidentDiscountsComponent } from './components/discounts/discounts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AccidentsComponent,
    children: [
      { path: 'checkpoints', component: AccidentCheckpointsComponent },
      { path: 'statuses', component: AccidentStatusesComponent },
      { path: 'types', component: AccidentTypesComponent },
      { path: 'discounts', component: AccidentDiscountsComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
