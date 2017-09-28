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
import { CitiesComponent } from './components/cities/cities.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { CitiesService } from '../../components/city/cities.service';
import { HospitalsService } from '../../components/hospital/hospitals.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AppTranslationModule } from '../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    Ng2Bs3ModalModule,
  ],
  declarations: [
    GeoComponent,
    CitiesComponent,
    HospitalsComponent,
  ],
  providers: [
    CitiesService,
    HospitalsService,
  ],
})

export class GeoModule {}
