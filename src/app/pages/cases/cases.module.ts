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
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CasesService } from '../../components/case/cases.service';
import { CaseEditorComponent } from '../../components/case/components/editor/editor.component';
import { CasesListComponent } from '../../components/case/components/list/list.component';
import { AccidentsService } from '../../components/accident/accidents.service';
import { SelectServicesComponent } from '../../components/service/components/select/select.component';
import { ServicesService } from '../../components/service/services.service';
import { ServicesSelectorComponent } from '../../components/service/components/selector/selector.component';
import { SelectAccidentTypeComponent } from '../../components/accident/components/type/select/select.component';
import { AccidentTypesService } from '../../components/accident/components/type/types.service';
import {
  SelectButtonModule, MultiSelectModule, AutoCompleteModule,
  SpinnerModule, ButtonModule, TooltipModule, InputTextareaModule, InputTextModule,
  PanelModule, FileUploadModule, InplaceModule, ToolbarModule, DialogModule, PaginatorModule, CheckboxModule,
  ConfirmDialogModule, ConfirmationService, StepsModule, MenuModule, ToggleButtonModule, InputMaskModule,
} from 'primeng/primeng';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { AssistantSelectComponent } from '../../components/assistant/components/select/select.component';
import { AppTranslationModule } from '../../app.translation.module';
import { SelectAccidentComponent } from '../../components/accident/components/select/select.component';
import { AccidentCardComponent } from '../../components/accident/components/card/accidentCard.component';
import { PatientsService } from '../../components/patient/patients.service';
import { DoctorSelectComponent } from '../../components/doctors/select/select.component';
import { DoctorsService } from '../../components/doctors/doctors.service';
import { HospitalsService } from '../../components/hospital/hospitals.service';
import { HospitalSelectComponent } from '../../components/hospital/components/select/select.component';
import { SelectCaseTypeComponent } from '../../components/case/components/type/select.component';
import { DiagnosticService } from '../../components/diagnostic/diagnostic.service';
import { DiagnosticsSelectorComponent } from '../../components/diagnostic/components/selector/selector.component';
import { SelectDiagnosticsComponent } from '../../components/diagnostic/components/select/select.component';
import { ImporterComponent } from '../../components/importer/importer.component';
import { AuthenticationService } from '../../components/auth/authentication.service';
import { ImporterService } from '../../components/importer/importer.service';
import { SelectDiscountComponent } from '../../components/discount/components/select/select.component';
import { DiscountService } from '../../components/discount/discount.service';
import { FileUploaderComponent } from '../../components/upload/components/uploader/uploader.component';
import { DocumentsService } from '../../components/document/documents.service';
import { AccidentStatusSelectComponent } from
  '../../components/accident/components/status/components/select/select.component';
import { AccidentStatusesService } from '../../components/accident/components/status/statuses.service';
import { AccidentCheckpointsSelectorComponent } from
  '../../components/accident/components/checkpoint/components/select/select.component';
import { AccidentCheckpointsService } from '../../components/accident/components/checkpoint/checkpoints.service';
import { ExporterService } from '../../components/exporter/exporter.service';
import { CitiesService } from '../../components/city/cities.service';
import { CitiesModule } from '../../components/city/cities.module';
import { AccidentScenarioComponent } from
  '../../components/accident/components/scenario/components/line/line.component';
import { AccidentScenarioService } from '../../components/accident/components/scenario/scenario.service';
import { DateHelper } from '../../helpers/date.helper';
import { SelectSurveysComponent } from '../../components/survey/components/select/select.component';
import { SurveysSelectorComponent } from '../../components/survey/components/selector/selector.component';
import { SurveyService } from '../../components/survey/survey.service';
import { PatientSelectorComponent } from '../../components/patient/components/selector/selector.component';
import { SelectPatientComponent } from '../../components/patient/components/select/select.component';
import { PatientEditorComponent } from '../../components/patient/components/editor/editor.component';
import { AccidentActivityComponent } from '../../components/accident/components/activity/activity.component';
import { AccidentChatComponent } from '../../components/accident/components/chat/chat.component';
import { AccidentHistoryComponent } from '../../components/accident/components/history/components/history.component';
import { CommentsComponent } from '../../components/comment/components/comments.component';

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
    Ng2Bs3ModalModule,
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
  ],
  declarations: [
    CasesComponent,
    CaseEditorComponent,
    CasesListComponent,
    SelectServicesComponent,
    ServicesSelectorComponent,
    SelectAccidentTypeComponent,
    AssistantSelectComponent,
    SelectDiscountComponent,
    SelectAccidentComponent,
    AccidentCardComponent,
    DoctorSelectComponent,
    HospitalSelectComponent,
    SelectCaseTypeComponent,
    FileUploaderComponent,
    DiagnosticsSelectorComponent,
    SurveysSelectorComponent,
    SelectDiagnosticsComponent,
    SelectSurveysComponent,
    ImporterComponent,
    AccidentStatusSelectComponent,
    AccidentCheckpointsSelectorComponent,
    AccidentScenarioComponent,
    PatientSelectorComponent,
    SelectPatientComponent,
    PatientEditorComponent,
    AccidentActivityComponent,
    AccidentChatComponent,
    AccidentHistoryComponent,
    CommentsComponent,
  ],
  providers: [
    CasesService,
    AccidentsService,
    ServicesService,
    AccidentTypesService,
    AssistantsService,
    DiscountService,
    PatientsService,
    DoctorsService,
    HospitalsService,
    DiagnosticService,
    SurveyService,
    AuthenticationService,
    ImporterService,
    DocumentsService,
    AccidentStatusesService,
    AccidentCheckpointsService,
    ExporterService,
    CitiesService,
    AccidentScenarioService,
    ConfirmationService,
    DateHelper,
  ],
})
export class CasesModule {
}
