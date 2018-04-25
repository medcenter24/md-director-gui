/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CitySelectComponent } from './city.select.component';
import { CitiesService } from '../../cities.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    AppTranslationModule,
  ],
  providers: [
    CitiesService,
  ],
  declarations: [
    CitySelectComponent,
  ],
  exports: [
    CitySelectComponent,
  ],
})
export class CitySelectModule {
}
