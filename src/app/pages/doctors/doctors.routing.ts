/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DoctorDatatableComponent } from '../../components/doctors/components/datatable';
import { DoctorsComponent } from './doctors.component';
import { DiagnosticDatatableComponent } from '../../components/diagnostic/components/datatable';
import { ServiceDatatableComponent } from '../../components/service/components/datatable';
import { SurveyDatatableComponent } from '../../components/survey/components/datatable';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      { path: 'surveys', component: SurveyDatatableComponent },
      { path: 'stuff', component: DoctorDatatableComponent },
      { path: 'diagnostics', component: DiagnosticDatatableComponent },
      { path: 'services', component: ServiceDatatableComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
