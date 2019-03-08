/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AccidentHistoryComponent } from './accident.history.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
  ],
  declarations: [
    AccidentHistoryComponent,
  ],
  exports: [
    AccidentHistoryComponent,
  ],
})
export class AccidentHistoryModule {
}
