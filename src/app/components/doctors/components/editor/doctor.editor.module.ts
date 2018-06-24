/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DoctorEditorComponent } from './doctor.editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { UserSelectModule } from '../../../users/select';
import { InputTextareaModule, InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { UserEditorModule } from '../../../users/editor';
import { DiagnosticCategoryEditorModule } from '../../../diagnostic/category/components/editor';
import { MultiSelectorModule } from '../../../ui/selector/components/multiSelector';
import { DoctorsService } from '../../doctors.service';
import { CitiesService } from '../../../city';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    UserSelectModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    UserEditorModule,
    DiagnosticCategoryEditorModule,
    MultiSelectorModule,
  ],
  providers: [
    DoctorsService,
    CitiesService,
  ],
  exports: [
    DoctorEditorComponent,
  ],
  declarations: [
    DoctorEditorComponent,
  ],
})
export class DoctorEditorModule {
}
