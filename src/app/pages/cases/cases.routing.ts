/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';

import { Cases } from './cases.component';
import { ModuleWithProviders } from '@angular/core';
import {CaseEditorComponent} from "../../components/case/editor/editor.component";
import {CasesListComponent} from "../../components/case/list/list.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Cases,
    children: [

      { path: '', component: CasesListComponent },
      { path: 'new', component: CaseEditorComponent },
      /*{ path: ':id', component: CaseEditorComponent },*/
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
