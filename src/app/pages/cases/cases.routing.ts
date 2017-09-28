/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';

import { CasesComponent } from './cases.component';
import { ModuleWithProviders } from '@angular/core';
import { CaseEditorComponent } from '../../components/case/components/editor/editor.component';
import { CasesListComponent } from '../../components/case/components/list/list.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CasesComponent,
    children: [
      { path: '', component: CasesListComponent },
      { path: 'new', component: CaseEditorComponent },
      { path: ':id', component: CaseEditorComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
