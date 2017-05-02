/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing }       from './companions.routing';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../faker/in-memory-data.service';
import { Companions } from './companions.component';
import { AssistantEditorComponent } from '../../components/assistant/editor/editor.component';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { PatientsService } from '../../components/patient/patients.service';
import { Patients } from './components/patients/patients.component';
import { Assistants } from './components/assistants/assistants.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    TranslateModule.forChild(),
    Ng2SmartTableModule,
    SlimLoadingBarModule.forRoot(),
    Ng2Bs3ModalModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/'}),
  ],
  declarations: [
    Companions,
    Assistants,
    Patients,
    AssistantEditorComponent,
  ],
  providers: [
    AssistantsService,
    PatientsService,
  ]
})

export class CompanionsModule { }
