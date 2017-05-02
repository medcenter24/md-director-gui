/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Companions } from './companions.component';
import { Assistants } from './components/assistants/assistants.component';
import { Patients } from './components/patients/patients.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Companions,
    children: [
      { path: 'assistants', component: Assistants },
      { path: 'patients', component: Patients },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
