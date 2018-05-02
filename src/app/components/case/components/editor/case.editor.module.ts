/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  ConfirmDialogModule,
  DialogModule,
  FileUploadModule,
  InplaceModule, InputMaskModule,
  TooltipModule,
} from 'primeng/primeng';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { CaseEditorComponent } from './case.editor.component';
import { CaseEditorTabsService } from './case.editor.tabs.service';
import { CaseTypeSelectModule } from '../type/case.type.select.module';
import { HospitalModule } from '../../../hospital/hospital.module';
import { AccidentSelectModule } from '../../../accident/components/select/accident.select.module';
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
import { CitySelectModule } from '../../../city/components/select';
import { DoctorSelectModule } from '../../../doctors/components/select';
import { AssistantSelectModule } from '../../../assistant/components/select';
import { ServiceSelectorModule } from '../../../service/components/selector';

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
    AssistantSelectModule,
    CaseTypeSelectModule,
    CitySelectModule,
    DoctorSelectModule,
    InputMaskModule,
    HospitalModule,
    AccidentSelectModule,
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
  ],
  declarations: [
    CaseEditorComponent,
  ],
  providers: [
    CaseEditorTabsService,
  ],
  exports: [
    CaseEditorComponent,
  ],
})
export class CaseEditorModule {
}
