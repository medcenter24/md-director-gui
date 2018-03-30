/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './settings.routing';
import { AccidentCheckpointsComponent } from './components/checkpoints/checkpoints.component';
import { AccidentsService } from '../../components/accident/accidents.service';
import { AccidentTypesService } from '../../components/accident/components/type/types.service';
import { AccidentCheckpointsService } from '../../components/accident/components/checkpoint/checkpoints.service';
import { AccidentStatusesService } from '../../components/accident/components/status/statuses.service';
import { SettingsComponent } from './settings.component';
import { AppTranslationModule } from '../../app.translation.module';
import { AccidentFinanceComponent } from './components/finance/finance.component';
import { AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';
import { AssistantsService } from '../../components/assistant/assistant.service';
import { DoctorsService } from '../../components/doctors/doctors.service';
import { CitiesService } from '../../components/city/cities.service';
import { CasesService } from '../../components/case/cases.service';
import { ServicesService } from '../../components/service/services.service';
import { CitiesModule } from '../../components/city/cities.module';
import { AssistantModule } from '../../components/assistant/assistant.module';
import { DoctorModule } from '../../components/doctors/doctor.module';
import { ServiceModule } from '../../components/service/service.module';
import { NumbersHelper } from '../../helpers/numbers.helper';
import { FinanceModule } from '../../components/finance/finance.module';
import { DatePeriodModule } from '../../components/datePeriod/datePeriod.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    AppTranslationModule,
    AutoCompleteModule,
    MultiSelectModule,
    CitiesModule,
    AssistantModule,
    DoctorModule,
    ServiceModule,
    FinanceModule,
    DatePeriodModule,
  ],
  declarations: [
    SettingsComponent,
    AccidentCheckpointsComponent,
    AccidentFinanceComponent,
  ],
  providers: [
    AccidentStatusesService,
    AccidentCheckpointsService,
    AccidentTypesService,
    AccidentsService,
    AssistantsService,
    DoctorsService,
    CitiesService,
    CasesService,
    ServicesService,
    NumbersHelper,
  ],
})
export class SettingsModule {
}
