/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../../../app.translation.module';
import { DatatableModule } from '../../../../../ui/datatable';
import { FinanceCurrencyService } from '../../finance.currency.service';
import { FinanceCurrencyDatatableComponent } from './finance.currency.datatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DatatableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [
    FinanceCurrencyService,
  ],
  declarations: [
    FinanceCurrencyDatatableComponent,
  ],
  exports: [
    FinanceCurrencyDatatableComponent,
  ],
})
export class FinanceCurrencyDatatableModule {
}
