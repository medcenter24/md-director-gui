/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CompanionsPageComponent } from './companions.page.component';
import { routing } from './companions.page.routing';
import { PatientDatatableModule } from '../../components/patient/components/datatable';
import { AssistantDatatableModule } from '../../components/assistant/components/datatable';

@NgModule({
  imports: [
    AssistantDatatableModule,
    routing,
    PatientDatatableModule,
  ],
  declarations: [
    CompanionsPageComponent,
  ],
})

export class CompanionsPageModule { }
