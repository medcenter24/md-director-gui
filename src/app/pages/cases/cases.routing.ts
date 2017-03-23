/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';

import { Cases } from './cases.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Cases,
    children: [
      /*{ path: 'new', component: CaseEditorComponent },
      { path: ':id', component: CaseEditorComponent },*/
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
