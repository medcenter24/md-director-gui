/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { SurveySelectComponent } from './survey.select.component';
import { MultiSelectModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { SurveyService } from '../../survey.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    MultiSelectModule,
  ],
  declarations: [
    SurveySelectComponent,
  ],
  providers: [
    SurveyService,
  ],
  exports: [
    SurveySelectComponent,
  ],
})
export class SurveySelectModule {
}
