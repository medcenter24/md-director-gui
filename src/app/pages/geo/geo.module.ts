/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './geo.routing';
import { GeoComponent } from './geo.component';
import { AppTranslationModule } from '../../app.translation.module';
import { CityDatatableModule } from '../../components/city/components/datatable';
import { HospitalDatatableModule } from '../../components/hospital/components/datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    CityDatatableModule,
    HospitalDatatableModule,
  ],
  declarations: [
    GeoComponent,
  ],
})

export class GeoModule {}
