/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './companions.routing';
import { AssistantEditorComponent } from '../../components/assistant/components/editor/editor.component';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { PatientsService } from '../../components/patient/patients.service';
import { PatientsComponent } from './components/patients/patients.component';
import { AssistantsComponent } from './components/assistants/assistants.component';
import { DateHelper } from '../../helpers/date.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    AssistantsComponent,
    PatientsComponent,
    AssistantEditorComponent,
  ],
  providers: [
    AssistantsService,
    PatientsService,
    DateHelper,
  ],
})

export class CompanionsModule { }
