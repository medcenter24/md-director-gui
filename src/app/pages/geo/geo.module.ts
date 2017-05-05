/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing }       from './geo.routing';
import { Geo } from './geo.component';

import { Cities } from './components/cities/cities.component';
import {Hospitals} from "./components/hospitals/hospitals.component";
import {CitiesService} from "../../components/city/cities.service";
import {HospitalsService} from "../../components/hospital/hospitals.service";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "../../faker/in-memory-data.service";
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
    InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/', passThruUnknownUrl: true}),
  ],
  declarations: [
    Geo,
    Cities,
    Hospitals,
  ],
  providers: [
    CitiesService,
    HospitalsService,
  ]
})

export class GeoModule {}
