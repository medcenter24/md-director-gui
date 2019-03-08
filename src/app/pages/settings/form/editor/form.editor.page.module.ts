/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FormEditorPageComponent } from './form.editor.page.component';
import { AppTranslationModule } from '../../../../app.translation.module';
import { ButtonModule } from 'primeng/button';
import { NgaModule } from '../../../../theme/nga.module';
import { RouterModule } from '@angular/router';
import { FormEditorModule } from '../../../../components/forms/components/editor';

@NgModule({
  imports: [
    AppTranslationModule,
    ButtonModule,
    NgaModule,
    FormEditorModule,
    RouterModule,
  ],
  exports: [FormEditorPageComponent],
  declarations: [FormEditorPageComponent],
})
export class FormEditorPageModule {
}
