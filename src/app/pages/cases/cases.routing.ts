/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';

import { Cases } from './cases.component';
import { Assistants } from './components/assistants/assistants.component';
import { Checkpoints } from './components/checkpoints/checkpoints.component';
import { Statuses } from './components/statuses/statuses.component';
import { Types } from './components/types/types.component';
import { Patients } from './components/patients/patients.component';
import { Accidents } from './components/accidents/accidents.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Cases,
    children: [
      { path: 'assistants', component: Assistants },
      { path: 'checkpoints', component: Checkpoints },
      { path: 'statuses', component: Statuses },
      { path: 'types', component: Types },
      { path: 'patients', component: Patients },
      { path: 'accidents', component: Accidents },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
