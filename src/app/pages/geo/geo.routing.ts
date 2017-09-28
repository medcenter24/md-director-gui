/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GeoComponent } from './geo.component';
import { CitiesComponent } from './components/cities/cities.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: GeoComponent,
    children: [
      { path: 'cities', component: CitiesComponent },
      { path: 'hospitals', component: HospitalsComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
