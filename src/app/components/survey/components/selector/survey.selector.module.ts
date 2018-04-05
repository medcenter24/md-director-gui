/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { SurveySelectModule } from '../select/survey.select.module';
import { SurveysSelectorComponent } from './survey.selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    SurveySelectModule,
  ],
  declarations: [SurveysSelectorComponent],
  providers: [],
  exports: [SurveysSelectorComponent],
})
export class SurveySelectorModule {
}
