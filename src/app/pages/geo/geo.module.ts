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
import { CitiesService } from './components/cities/cities.service';

import { Hotels } from './components/hotels/hotels.component';
import { HotelsService } from './components/hotels/hotels.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    Geo,
    Cities,
    Hotels,
  ],
  providers: [
    CitiesService,
    HotelsService,
  ]
})

export class GeoModule {}
