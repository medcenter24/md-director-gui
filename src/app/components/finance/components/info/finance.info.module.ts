/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FinanceCurrencyIcoModule } from '../currency/directive/ico';
import { FinanceInfoComponent } from './finance.info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    FinanceCurrencyIcoModule,
  ],
  exports: [FinanceInfoComponent],
  declarations: [FinanceInfoComponent],
})
export class FinanceInfoModule { }
