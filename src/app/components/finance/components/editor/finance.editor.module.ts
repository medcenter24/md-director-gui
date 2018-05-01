/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DoctorSelectModule } from '../../../doctors/components/select';
import { FinanceEditorComponent } from './finance.editor.component';
import { AssistantSelectModule } from '../../../assistant/components/select';
import { CitySelectModule } from '../../../city/components/select';
import { ServiceSelectModule } from '../../../service/components/select';
import { NgaModule } from '../../../../theme/nga.module';
import { FinanceService } from '../../finance.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DoctorSelectModule,
    AssistantSelectModule,
    CitySelectModule,
    ServiceSelectModule,
    NgaModule,
  ],
  providers: [
    FinanceService,
  ],
  declarations: [
    FinanceEditorComponent,
  ],
  exports: [
    FinanceEditorComponent,
  ],
})
export class FinanceEditorModule {
}
