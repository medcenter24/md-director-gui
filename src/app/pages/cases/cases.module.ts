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
import { SelectAccidentTypeComponent } from '../../components/accident/components/type/select/select.component';
import { AccidentTypesService } from '../../components/accident/components/type/types.service';
import {
  SelectButtonModule, CalendarModule, MultiSelectModule, AutoCompleteModule,
  SpinnerModule, ButtonModule, GrowlModule, TooltipModule, InputTextareaModule, InputTextModule
} from 'primeng/primeng';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { AssistantSelectComponent } from '../../components/assistant/components/select/select.component';
import { AppTranslationModule } from '../../app.translation.module';
import { SelectAccidentDiscountComponent } from '../../components/accident/components/discount/components/select/select.component';
import { AccidentDiscountsService } from '../../components/accident/components/discount/discount.service';
import { SelectAccidentComponent } from '../../components/accident/components/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    SelectButtonModule,
    CalendarModule,
    MultiSelectModule,
    AutoCompleteModule,
    SpinnerModule,
    Ng2Bs3ModalModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/', passThruUnknownUrl: true}),
    SelectModule,
    ButtonModule,
    GrowlModule,
    TooltipModule,
    AppTranslationModule,
    InputTextareaModule,
    InputTextModule
  ],
  declarations: [
    Cases,
    CaseEditorComponent,
    CasesListComponent,
    SelectServicesComponent,
    ServicesSelectorComponent,
    SelectAccidentTypeComponent,
    AssistantSelectComponent,
    SelectAccidentDiscountComponent,
    SelectAccidentComponent
  ],
  providers: [
    CasesService,
    AccidentsService,
    ServicesService,
    AccidentTypesService,
    AssistantsService,
    AccidentDiscountsService,
  ]
})
export class CasesModule {
}
