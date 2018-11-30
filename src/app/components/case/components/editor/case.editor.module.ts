/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule, CheckboxModule,
  ConfirmDialogModule,
  DialogModule,
  FileUploadModule,
  InplaceModule, InputMaskModule,
  TooltipModule,
} from 'primeng/primeng';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../../forms';
import { InvoiceEditorModule } from '../../../invoice/components/editor';
import { DownloadFileModule } from '../../../upload/components/download';
import { UploadFileModule } from '../../../upload/components/file';
import { CaseEditorComponent } from './case.editor.component';
import { CaseEditorTabsService } from './case.editor.tabs.service';
import { CaseTypeSelectModule } from '../type/case.type.select.module';
import { AccidentCardModule } from '../../../accident/components/card';
import { PatientEditorModule } from '../../../patient/components/editor';
import { PatientSelectorModule } from '../../../patient/components/selector/patient.selector.module';
import { AccidentScenarioLineModule }
  from '../../../accident/components/scenario/components/line/accident.scenario.line.module';
import { AccidentCheckpointsSelectorModule }
  from '../../../accident/components/checkpoint/components/select/accident.checkpoints.selector.module';
import { AccidentTypeSelectModule } from '../../../accident/components/type/select';
import { SurveySelectorModule } from '../../../survey/components/selector/survey.selector.module';
import { DiagnosticSelectorModule } from '../../../diagnostic/components/selector';
import { UploaderModule } from '../../../upload/components/uploader';
import { CaseFinanceModule } from '../finance';
import { NgaModule } from '../../../../theme/nga.module';
import { AccidentActivityModule } from '../../../accident/components/activity';
import { ServiceSelectorModule } from '../../../service/components/selector';
import { AutocompleterModule } from '../../../ui/selector/components/autocompleter';
import { DoctorsService } from '../../../doctors';
import { AssistantsService } from '../../../assistant';
import { CitiesService } from '../../../city';
import { AccidentsService } from '../../../accident/accidents.service';
import { HospitalsService } from '../../../hospital';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DialogModule,
    FileUploadModule,
    ConfirmDialogModule,
    ButtonModule,
    InplaceModule,
    TooltipModule,
    CaseTypeSelectModule,
    InputMaskModule,
    AccidentCardModule,
    PatientEditorModule,
    PatientSelectorModule,
    AccidentScenarioLineModule,
    AccidentCheckpointsSelectorModule,
    ServiceSelectorModule,
    AccidentTypeSelectModule,
    SurveySelectorModule,
    DiagnosticSelectorModule,
    UploaderModule,
    CaseFinanceModule,
    AccidentActivityModule,
    NgaModule,
    AutocompleterModule,
    KeyFilterModule,
    CheckboxModule,
    InvoiceEditorModule,
    UploadFileModule,
    DownloadFileModule,
  ],
  declarations: [
    CaseEditorComponent,
  ],
  providers: [
    CaseEditorTabsService,
    DoctorsService,
    AssistantsService,
    CitiesService,
    AccidentsService,
    HospitalsService,
    FormService,
  ],
  exports: [
    CaseEditorComponent,
  ],
})
export class CaseEditorModule {
}
