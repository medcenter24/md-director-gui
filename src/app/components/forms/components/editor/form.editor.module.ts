/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { FormService } from '../../form.service';
import { FormEditorComponent } from './form.editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
  ],
  providers: [
    FormService,
  ],
  declarations: [
    FormEditorComponent,
  ],
  exports: [
    FormEditorComponent,
  ],
})
export class FormEditorModule {
}
