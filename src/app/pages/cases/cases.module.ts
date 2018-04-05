/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CasesComponent } from './cases.component';
import { routing } from './cases.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CasesService } from '../../components/case/cases.service';
import { AccidentsService } from '../../components/accident/accidents.service';
import { AccidentTypesService } from '../../components/accident/components/type/types.service';
import {
  SelectButtonModule, MultiSelectModule, AutoCompleteModule,
  SpinnerModule, ButtonModule, TooltipModule, InputTextareaModule, InputTextModule,
  PanelModule, FileUploadModule, InplaceModule, ToolbarModule, DialogModule, PaginatorModule, CheckboxModule,
  ConfirmDialogModule, ConfirmationService, StepsModule, MenuModule, ToggleButtonModule, InputMaskModule,
} from 'primeng/primeng';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { AppTranslationModule } from '../../app.translation.module';
import { PatientsService } from '../../components/patient/patients.service';
import { AuthenticationService } from '../../components/auth/authentication.service';
import { DocumentsService } from '../../components/document/documents.service';
import { AccidentStatusSelectComponent } from
  '../../components/accident/components/status/components/select/select.component';
import { AccidentStatusesService } from '../../components/accident/components/status/statuses.service';
import { CitiesService } from '../../components/city/cities.service';
import { CitiesModule } from '../../components/city/cities.module';
import { DateHelper } from '../../helpers/date.helper';
import { NumbersHelper } from '../../helpers/numbers.helper';
import { AssistantModule } from '../../components/assistant/assistant.module';
import { DoctorModule } from '../../components/doctors/doctor.module';
import { ServiceModule } from '../../components/service/service.module';
import { CaseListModule } from '../../components/case/components/list/case.list.module';
import { CaseEditorModule } from '../../components/case/components/editor/case.editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    SelectButtonModule,
    MultiSelectModule,
    AutoCompleteModule,
    SpinnerModule,
    ButtonModule,
    TooltipModule,
    AppTranslationModule,
    InputTextareaModule,
    InputTextModule,
    PanelModule,
    FileUploadModule,
    InplaceModule,
    ToolbarModule,
    DialogModule,
    PaginatorModule,
    CheckboxModule,
    CitiesModule,
    StepsModule,
    MenuModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    InputMaskModule,
    AssistantModule,
    DoctorModule,
    ServiceModule,

    // new impl
    CaseListModule,
    CaseEditorModule,
  ],
  declarations: [
    CasesComponent,
    AccidentStatusSelectComponent,
  ],
  providers: [
    CasesService,
    AuthenticationService,
    DocumentsService,
    AccidentStatusesService,
    CitiesService,
    ConfirmationService,
    DateHelper,
    NumbersHelper,
    AccidentsService,
    AccidentTypesService,
    AssistantsService,
    PatientsService,
  ],
})
export class CasesModule {
}
