/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DatatableModule } from '../../../ui/datatable';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';
import { DiagnosticDatatableComponent } from './diagnostic.datatable.component';
import { DiagnosticService } from '../../diagnostic.service';
import { DiagnosticEditorModule } from '../editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DatatableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DiagnosticEditorModule,
  ],
  providers: [
    DiagnosticService,
  ],
  declarations: [
    DiagnosticDatatableComponent,
  ],
  exports: [
    DiagnosticDatatableComponent,
  ],
})
export class DiagnosticDatatableModule {
}
