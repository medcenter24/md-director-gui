/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Doctors } from './doctors.component';
import { Diagnostics } from './components/diagnostics/diagnostics.component';
import { Services } from './components/services/services.component';
import { Stuff } from './components/stuff/stuff.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Doctors,
    children: [
      { path: 'diagnostics', component: Diagnostics },
      { path: 'services', component: Services },
      { path: 'stuff', component: Stuff },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
