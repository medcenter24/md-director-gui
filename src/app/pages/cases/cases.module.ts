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

import { routing }       from './cases.routing';
import { Cases } from './cases.component';

import { Assistants } from './components/assistants/assistants.component';
import { AssistantsService } from './components/assistants/assistants.service';

import { Checkpoints } from './components/checkpoints/checkpoints.component';
import { CheckpointsService } from './components/checkpoints/checkpoints.service';

import { Statuses } from './components/statuses/statuses.component';
import { StatusesService } from './components/statuses/statuses.service';

import { Types } from './components/types/types.component';
import { TypesService } from './components/types/types.service';

import { Accidents } from './components/accidents/accidents.component';
import { AccidentsService } from './components/accidents/accidents.service';

import { Patients } from './components/patients/patients.component';
import { PatientsService } from './components/patients/patients.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    Accidents,
    Assistants,
    Statuses,
    Checkpoints,
    Types,
    Patients,
    Cases,
  ],
  providers: [
    AssistantsService,
    StatusesService,
    CheckpointsService,
    TypesService,
    PatientsService,
    AccidentsService,
  ]
})

export class CasesModule {}
