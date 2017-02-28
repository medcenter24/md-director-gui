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

import { routing }       from './doctors.routing';
import { Doctors } from './doctors.component';

import { Diagnostics } from './components/diagnostics/diagnostics.component';
import { DiagnosticsService } from './components/diagnostics/diagnostics.service';
import { Diagnose } from './components/diagnostics/components/diagnose/diagnose.component';

import { Services } from './components/services/services.component';
import { ServicesService } from './components/services/services.service';

import { Stuff } from './components/stuff/stuff.component';
import { StuffService } from './components/stuff/stuff.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    Doctors,
    Stuff,
    Services,
    Diagnostics,
    Diagnose
  ],
  providers: [
    StuffService,
    ServicesService,
    DiagnosticsService,
  ]
})

export class DoctorsModule {}
