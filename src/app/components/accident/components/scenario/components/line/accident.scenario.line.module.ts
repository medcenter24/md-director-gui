/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccidentScenarioLineComponent } from './accident.scenario.line.component';
import { AppTranslationModule } from '../../../../../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
  ],
  declarations: [
    AccidentScenarioLineComponent,
  ],
  providers: [],
  exports: [AccidentScenarioLineComponent],
})
export class AccidentScenarioLineModule {
}
