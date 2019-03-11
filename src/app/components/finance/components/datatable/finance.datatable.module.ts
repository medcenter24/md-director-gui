/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppTranslationModule } from '../../../../app.translation.module';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '../../../ui/datatable';
import { ConfirmDialogModule, InputMaskModule } from 'primeng/primeng';
import { FinanceService } from '../../finance.service';
import { FinanceDatatableComponent } from './finance.datatable.component';
import { FinanceEditorModule } from '../editor';
import { NgaModule } from '../../../../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DialogModule,
    ButtonModule,
    DatatableModule,
    InputMaskModule,
    ConfirmDialogModule,
    FinanceEditorModule,
    NgaModule,
],
  providers: [
    FinanceService,
  ],
  declarations: [
    FinanceDatatableComponent,
  ],
  exports: [
    FinanceDatatableComponent,
  ],
})
export class FinanceDatatableModule {
}
