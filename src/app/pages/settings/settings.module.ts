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
import { FormDatatableModule } from '../../components/forms/components/datatable';
import { FormEditorPageModule } from './form/editor';

@NgModule({
  imports: [
    routing,
    PeriodDatatableModule,
    AccidentCheckpointDatatableModule,
    FormDatatableModule,
    FormEditorPageModule,
  ],
  declarations: [
    SettingsComponent,
  ],
})
export class SettingsModule {
}
