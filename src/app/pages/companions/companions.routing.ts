/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CompanionsComponent } from './companions.component';
import { AssistantsComponent } from './components/assistants/assistants.component';
import { PatientsComponent } from './components/patients/patients.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CompanionsComponent,
    children: [
      { path: 'assistants', component: AssistantsComponent },
      { path: 'patients', component: PatientsComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
