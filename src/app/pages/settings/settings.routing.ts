/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { PeriodDatatableComponent } from '../../components/period/components/datatable/period.datatable.component';
import { AccidentCheckpointDatatableComponent }
  from '../../components/accident/components/checkpoint/components/datatable/accident.checkpoint.datatable.component';
import { FinanceEditorComponent } from '../../components/finance/components/editor';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'checkpoints', component: AccidentCheckpointDatatableComponent },
      { path: 'finance', component: FinanceEditorComponent },
      { path: 'periods', component: PeriodDatatableComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
