/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AccidentActivityComponent } from './accident.activity.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { AccidentChatModule } from '../chat';
import { AccidentHistoryModule } from '../history/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AccidentChatModule,
    AccidentHistoryModule,
  ],
  declarations: [
    AccidentActivityComponent,
  ],
  exports: [
    AccidentActivityComponent,
  ],
})
export class AccidentActivityModule {
}
