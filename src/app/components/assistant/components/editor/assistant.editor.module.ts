/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AssistantEditorComponent } from './assistant.editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { AssistantsService } from '../../assistant.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
  ],
  declarations: [
    AssistantEditorComponent,
  ],
  exports: [
    AssistantEditorComponent,
  ],
  providers: [
    AssistantsService,
  ],
})
export class AssistantEditorModule {
}
