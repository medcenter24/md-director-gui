/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { routing } from './settings.routing';
import { SettingsComponent } from './settings.component';
import { PeriodDatatableModule } from '../../components/period/components/datatable';
import { AccidentCheckpointDatatableModule }
  from '../../components/accident/components/checkpoint/components/datatable';
import { FinanceEditorModule } from '../../components/finance/components/editor';

@NgModule({
  imports: [
    routing,
    PeriodDatatableModule,
    AccidentCheckpointDatatableModule,
    FinanceEditorModule,
  ],
  declarations: [
    SettingsComponent,
  ],
})
export class SettingsModule {
}
