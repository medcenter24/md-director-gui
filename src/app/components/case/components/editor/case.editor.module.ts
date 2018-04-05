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
import { AssistantModule } from '../../../assistant/assistant.module';
import { CaseTypeSelectModule } from '../type/case.type.select.module';
import { CitiesModule } from '../../../city/cities.module';
import { DoctorModule } from '../../../doctors/doctor.module';
import { HospitalModule } from '../../../hospital/hospital.module';
import { AccidentSelectModule } from '../../../accident/components/select/accident.select.module';
import { AccidentCardModule } from '../../../accident/components/card/accident.card.module';
import { PatientEditorModule } from '../../../patient/components/editor/patient.editor.module';
import { PatientSelectorModule } from '../../../patient/components/selector/patient.selector.module';
import { AccidentScenarioLineModule }
  from '../../../accident/components/scenario/components/line/accident.scenario.line.module';
import { AccidentCheckpointsSelectorModule }
  from '../../../accident/components/checkpoint/components/select/accident.checkpoints.selector.module';
import { ServiceModule } from '../../../service/service.module';
import { AccidentTypeSelectModule } from '../../../accident/components/type/select/accident.type.select.module';
import { SurveySelectorModule } from '../../../survey/components/selector/survey.selector.module';
import { DiagnosticSelectorModule } from '../../../diagnostic/components/selector';
import { UploaderModule } from '../../../upload/components/uploader';
import { CaseFinanceModule } from '../finance/case.finance.module';
import { NgaModule } from '../../../../theme/nga.module';
import { AccidentActivityModule } from '../../../accident/components/activity';

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
    AssistantModule,
    CaseTypeSelectModule,
    CitiesModule,
    DoctorModule,
    InputMaskModule,
    HospitalModule,
    AccidentSelectModule,
    AccidentCardModule,
    PatientEditorModule,
    PatientSelectorModule,
    AccidentScenarioLineModule,
    AccidentCheckpointsSelectorModule,
    ServiceModule,
    AccidentTypeSelectModule,
    SurveySelectorModule,
    DiagnosticSelectorModule,
    UploaderModule,
    CaseFinanceModule,
    AccidentActivityModule,

    // deprecated
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
