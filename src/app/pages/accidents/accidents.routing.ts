/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';

import { Accidents } from './accidents.component';
import { Assistants } from './components/assistants/assistants.component';
import { Checkpoints } from './components/checkpoints/checkpoints.component';
import { Statuses } from './components/statuses/statuses.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Accidents,
    children: [
      { path: 'assistants', component: Assistants },
      { path: 'checkpoints', component: Checkpoints },
      { path: 'statuses', component: Statuses },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
