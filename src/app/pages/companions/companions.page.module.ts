/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AssistantsModule } from '../../components/assistant/components/list';
import { CompanionsPageComponent } from './companions.page.component';
import { routing } from './companions.page.routing';
import { PatientDatatableModule } from '../../components/patient/components/datatable';

@NgModule({
  imports: [
    AssistantsModule,
    routing,
    PatientDatatableModule,
  ],
  declarations: [
    CompanionsPageComponent,
  ],
})

export class CompanionsPageModule { }
