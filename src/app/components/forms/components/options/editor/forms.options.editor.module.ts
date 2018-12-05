/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule, InputTextModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../../app.translation.module';
import { FormOptionService } from '../form.option.service';
import { FormsOptionsEditorComponent } from './forms.options.editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
  ],
  declarations: [
    FormsOptionsEditorComponent,
  ],
  exports: [
    FormsOptionsEditorComponent,
  ],
  providers: [
    FormOptionService,
  ],
})
export class FormsOptionsEditorModule {
}
