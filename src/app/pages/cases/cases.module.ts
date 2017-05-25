/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Cases } from './cases.component';
import { routing }       from './cases.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../faker/in-memory-data.service';

import { CasesService } from '../../components/case/cases.service';
import { CaseEditorComponent } from '../../components/case/components/editor/editor.component';
import { CasesListComponent } from '../../components/case/components/list/list.component';
import { AccidentsService } from '../../components/accident/accidents.service';
import { SelectServicesComponent } from '../../components/service/components/select/select.component';
import { ServicesService } from '../../components/service/services.service';
import { ServicesSelectorComponent } from '../../components/service/components/selector/selector.component';
import { SelectModule } from 'ng2-select';
import { SelectAccidentTypeComponent } from '../../components/accident/components/type/select/select.component';
import { AccidentTypesService } from '../../components/accident/components/type/types.service';
import {
  SelectButtonModule, CalendarModule, MultiSelectModule, AutoCompleteModule,
  SpinnerModule, ButtonModule, TooltipModule, InputTextareaModule, InputTextModule,
  PanelModule, FileUploadModule, InplaceModule, ToolbarModule, DialogModule, PaginatorModule
} from 'primeng/primeng';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { AssistantSelectComponent } from '../../components/assistant/components/select/select.component';
import { AppTranslationModule } from '../../app.translation.module';
import { SelectAccidentDiscountComponent } from '../../components/accident/components/discount/components/select/select.component';
import { AccidentDiscountsService } from '../../components/accident/components/discount/discount.service';
import { SelectAccidentComponent } from '../../components/accident/components/select/select.component';
import { AccidentCardComponent } from '../../components/accident/components/card/accidentCard.component';
import { PatientsService } from '../../components/patient/patients.service';
import { DoctorSelectComponent } from '../../components/doctors/select/select.component';
import { DoctorsService } from '../../components/doctors/doctors.service';
import { HospitalsService } from '../../components/hospital/hospitals.service';
import { HospitalSelectComponent } from '../../components/hospital/components/select/select.component';
import { SelectCaseTypeComponent } from '../../components/case/components/type/select.component';
import { CitySelectComponent } from '../../components/city/components/select/select.component';
import { CitiesService } from '../../components/city/cities.service';
import { FileUploaderComponent } from '../../components/media/components/uploader/uploader.component';
import { MediaService } from '../../components/media/media.service';
import { DiagnosticService } from '../../components/diagnostic/diagnostic.service';
import { DiagnosticsSelectorComponent } from '../../components/diagnostic/components/selector/selector.component';
import { SelectDiagnosticsComponent } from '../../components/diagnostic/components/select/select.component';
import { ImporterComponent } from '../../components/importer/importer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    SelectButtonModule,
    CalendarModule,
    MultiSelectModule,
    AutoCompleteModule,
    SpinnerModule,
    Ng2Bs3ModalModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/', passThruUnknownUrl: true}),
    SelectModule,
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
    PaginatorModule
  ],
  declarations: [
    Cases,
    CaseEditorComponent,
    CasesListComponent,
    SelectServicesComponent,
    ServicesSelectorComponent,
    SelectAccidentTypeComponent,
    AssistantSelectComponent,
    SelectAccidentDiscountComponent,
    SelectAccidentComponent,
    AccidentCardComponent,
    DoctorSelectComponent,
    HospitalSelectComponent,
    SelectCaseTypeComponent,
    CitySelectComponent,
    FileUploaderComponent,
    DiagnosticsSelectorComponent,
    SelectDiagnosticsComponent,
    ImporterComponent
  ],
  providers: [
    CasesService,
    AccidentsService,
    ServicesService,
    AccidentTypesService,
    AssistantsService,
    AccidentDiscountsService,
    PatientsService,
    DoctorsService,
    HospitalsService,
    CitiesService,
    MediaService,
    DiagnosticService
  ]
})
export class CasesModule {
}
