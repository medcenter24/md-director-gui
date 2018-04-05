/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { CasesComponent } from './cases.component';
import { ModuleWithProviders } from '@angular/core';
import { CaseListComponent } from '../../components/case/components/list/case.list.component';
import { CaseEditorComponent } from '../../components/case/components/editor/case.editor.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CasesComponent,
    children: [
      { path: '', component: CaseListComponent },
      { path: 'new', component: CaseEditorComponent },
      { path: ':id', component: CaseEditorComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
