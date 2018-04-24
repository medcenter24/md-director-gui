/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './geo.routing';
import { GeoComponent } from './geo.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { HospitalsService } from '../../components/hospital/hospitals.service';
import { AppTranslationModule } from '../../app.translation.module';
import { CityDatatableModule } from '../../components/city/components/datatable/city.datatable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    CityDatatableModule,
  ],
  declarations: [
    GeoComponent,
    HospitalsComponent,
  ],
  providers: [
    HospitalsService,
  ],
})

export class GeoModule {}
