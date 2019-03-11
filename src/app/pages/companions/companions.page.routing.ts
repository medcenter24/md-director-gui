/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CompanionsPageComponent } from './companions.page.component';
import { PatientDatatableComponent } from '../../components/patient/components/datatable/patient.datatable.component';
import { AssistantDatatableComponent }
  from '../../components/assistant/components/datatable/assistant.datatable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CompanionsPageComponent,
    children: [
      { path: 'assistants', component: AssistantDatatableComponent },
      { path: 'patients', component: PatientDatatableComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
