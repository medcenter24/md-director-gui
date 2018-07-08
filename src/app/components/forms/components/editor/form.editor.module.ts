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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MediaFroalaService } from '../../../media/froala/media.froala.service';
import { FormsOptionsEditorModule } from '../options/editor';
import { FormsTypesSelectModule } from '../types/select/forms.types.select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsOptionsEditorModule,
    DialogModule,
    ButtonModule,
    FormsTypesSelectModule,
  ],
  providers: [
    FormService,
    MediaFroalaService,
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
