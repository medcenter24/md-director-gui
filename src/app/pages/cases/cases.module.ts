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
import { ServicesService } from '../../components/service/services.service';
import { ServicesSelectorComponent } from '../../components/service/components/selector/selector.component';
import { SelectModule } from 'ng2-select';
import { SelectAccidentTypeComponent } from '../../components/accident/type/select/select.component';
import { AccidentTypesService } from '../../components/accident/type/types.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    TranslateModule.forChild(),
    Ng2SmartTableModule,
    SlimLoadingBarModule.forRoot(),
    Ng2Bs3ModalModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/'}),
    SelectModule,
  ],
  declarations: [
    Cases,
    CaseEditorComponent,
    CasesListComponent,
    SelectServicesComponent,
    ServicesSelectorComponent,
    SelectAccidentTypeComponent
  ],
  providers: [
    CasesService,
    AccidentsService,
    ServicesService,
    AccidentTypesService
  ]
})
export class CasesModule { }
