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

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      /*
      { path: 'services', component: DoctorServicesComponent },
      { path: 'surveys', component: SurveysComponent },*/
      { path: 'stuff', component: DoctorDatatableComponent },
      { path: 'diagnostics', component: DiagnosticDatatableComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
