/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AppTranslationModule } from '../../app.translation.module';
import { AutoCompleteModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssistantSelectComponent } from './components/select/select.component';
import { AssistantsService } from './assistant.service';
import { CitySelectModule } from '../city/components/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AutoCompleteModule,
    CitySelectModule,
  ],
  declarations: [
    AssistantSelectComponent,
  ],
  providers: [
    AssistantsService,
  ],
  exports: [
    AssistantSelectComponent,
  ],
})
export class AssistantModule {
}
