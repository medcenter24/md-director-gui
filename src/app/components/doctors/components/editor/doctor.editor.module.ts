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
import { CitySelectModule } from '../../../city/components/select';
import { InputTextareaModule, InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { UserEditorModule } from '../../../users/editor';
import { DiagnosticCategoryEditorModule } from '../../../diagnostic/category/components/editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    UserSelectModule,
    CitySelectModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    UserEditorModule,
    DiagnosticCategoryEditorModule,
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
