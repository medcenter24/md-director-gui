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
import { AccidentCheckpoints } from './components/checkpoints/checkpoints.component';
import { AccidentTypes } from './components/types/types.component';
import { AccidentsService } from '../../components/accident/accidents.service';
import { AccidentTypesService } from '../../components/accident/type/types.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../faker/in-memory-data.service';
import { AccidentCheckpointsService } from '../../components/accident/checkpoint/checkpoints.service';
import { AccidentStatusesService } from '../../components/accident/status/statuses.service';
import { AccidentStatuses } from './components/statuses/statuses.component';
import { Accidents } from './accidents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    SlimLoadingBarModule.forRoot(),
    Ng2Bs3ModalModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/'}),
  ],
  declarations: [
    Accidents,
    AccidentStatuses,
    AccidentCheckpoints,
    AccidentTypes,
  ],
  providers: [
    AccidentStatusesService,
    AccidentCheckpointsService,
    AccidentTypesService,
    AccidentsService,
  ]
})
export class AccidentsModule {
}
