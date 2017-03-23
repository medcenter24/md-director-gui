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

import {Ng2SmartTableModule} from "ng2-smart-table";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "../../faker/in-memory-data.service";
import {CasesService} from "../../components/case/cases.service";

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
    Cases
  ],
  providers: [
      CasesService
  ]
})
export class CasesModule {}
