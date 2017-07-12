/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CitiesService } from './cities.service';
import { CitySelectComponent } from './components/select/select.component';
import { AppTranslationModule } from '../../app.translation.module';
import { AutoCompleteModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AutoCompleteModule,
  ],
  declarations: [
    CitySelectComponent,
  ],
  providers: [
    CitiesService,
  ],
  exports: [
    CitySelectComponent,
  ],
})
export class CitiesModule {
}
