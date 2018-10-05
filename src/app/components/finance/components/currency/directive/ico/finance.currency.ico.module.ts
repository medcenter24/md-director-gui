/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FinanceCurrencyService } from '../../finance.currency.service';
import { FinanceCurrencyIcoDirective } from './finance.currency.ico.directive';

@NgModule({
  providers: [
    FinanceCurrencyService,
  ],
  declarations: [
    FinanceCurrencyIcoDirective,
  ],
  exports: [
    FinanceCurrencyIcoDirective,
  ],
})
export class FinanceCurrencyIcoModule {}
