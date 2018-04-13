/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AssistantsModule } from '../../components/assistant/components/list';
import { PatientsModule } from '../../components/patient/components/list/patients.module';
import { CompanionsPageComponent } from './companions.page.component';
import { routing } from './companions.page.routing';

@NgModule({
  imports: [
    AssistantsModule,
    PatientsModule,
    routing,
  ],
  declarations: [
    CompanionsPageComponent,
  ],
})

export class CompanionsPageModule { }
