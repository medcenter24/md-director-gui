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

import { routing }       from './accidents.routing';
import { Accidents } from './accidents.component';

import { Assistants } from './components/assistants/assistants.component';
import { AssistantsService } from './components/assistants/assistants.service';

import { Checkpoints } from './components/checkpoints/checkpoints.component';
import { CheckpointsService } from './components/checkpoints/checkpoints.service';

import { Statuses } from './components/statuses/statuses.component';
import { StatusesService } from './components/statuses/statuses.service';

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
  ],
  providers: [
    AssistantsService,
    StatusesService,
    CheckpointsService,
  ]
})

export class AccidentsModule {}
