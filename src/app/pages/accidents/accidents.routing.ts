/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Accidents } from './accidents.component';
import { AccidentCheckpoints } from './components/checkpoints/checkpoints.component';
import { AccidentStatuses } from './components/statuses/statuses.component';
import { AccidentTypes } from './components/types/types.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Accidents,
    children: [
      { path: 'checkpoints', component: AccidentCheckpoints },
      { path: 'statuses', component: AccidentStatuses },
      { path: 'types', component: AccidentTypes },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
