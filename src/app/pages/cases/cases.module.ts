/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Cases } from './cases.component';
import { routing }       from './cases.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../faker/in-memory-data.service';
import { CasesService } from '../../components/case/cases.service';
import { CaseEditorComponent } from '../../components/case/components/editor/editor.component';
import { CasesListComponent } from '../../components/case/components/list/list.component';
import { AccidentsService } from '../../components/accident/accidents.service';
import { SelectServicesComponent } from '../../components/service/components/select/select.component';
import { Ng2CompleterModule } from 'ng2-completer';

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
    Ng2CompleterModule
  ],
  declarations: [
    Cases,
    CaseEditorComponent,
    CasesListComponent,
    SelectServicesComponent
  ],
  providers: [
    CasesService,
    AccidentsService
  ]
})
export class CasesModule { }
