/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CompanyEditorComponent } from './company.editor.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UploadPictureModule } from '../../../upload/components/picture';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ButtonModule,
    UploadPictureModule,
  ],
  declarations: [
    CompanyEditorComponent,
  ],
  exports: [
    CompanyEditorComponent,
  ],
})
export class CompanyEditorModule { }
