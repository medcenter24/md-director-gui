/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AssistantsComponent } from './assistants.component';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AssistantEditorModule } from '../editor/assistant.editor.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    AssistantEditorModule,
  ],
  exports: [
    AssistantsComponent,
  ],
  declarations: [
    AssistantsComponent,
  ],
})
export class AssistantsModule {
}
