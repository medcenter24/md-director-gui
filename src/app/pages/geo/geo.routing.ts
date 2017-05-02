/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Geo } from './geo.component';
import { Cities } from './components/cities/cities.component';
import { Hospitals } from './components/hospitals/hospitals.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Geo,
    children: [
      { path: 'cities', component: Cities },
      { path: 'hospitals', component: Hospitals }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
