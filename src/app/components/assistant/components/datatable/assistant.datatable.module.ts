/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DialogModule } from 'primeng/dialog';
import { AssistantEditorModule } from '../editor/assistant.editor.module';
import { AssistantDatatableComponent } from './assistant.datatable.component';
import { AssistantsService } from '../../assistant.service';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
    AppTranslationModule,
    AssistantEditorModule,
    DialogModule,
  ],
  declarations: [
    AssistantDatatableComponent,
  ],
  exports: [
    AssistantDatatableComponent,
  ],
  providers: [
    AssistantsService,
  ],
})
export class AssistantDatatableModule {
}
