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
import { routing } from './accidents.routing';
import { AccidentCheckpointsComponent } from './components/checkpoints/checkpoints.component';
import { AccidentTypesComponent } from './components/types/types.component';
import { AccidentsService } from '../../components/accident/accidents.service';
import { AccidentTypesService } from '../../components/accident/components/type/types.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AccidentCheckpointsService } from '../../components/accident/components/checkpoint/checkpoints.service';
import { AccidentStatusesService } from '../../components/accident/components/status/statuses.service';
import { AccidentStatusesComponent } from './components/statuses/statuses.component';
import { AccidentsComponent } from './accidents.component';
import { AppTranslationModule } from '../../app.translation.module';
import { DiscountService } from '../../components/discount/discount.service';
import { AccidentDiscountsComponent } from './components/discounts/discounts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    Ng2Bs3ModalModule,
    AppTranslationModule,
  ],
  declarations: [
    AccidentsComponent,
    AccidentStatusesComponent,
    AccidentCheckpointsComponent,
    AccidentTypesComponent,
    AccidentDiscountsComponent,
  ],
  providers: [
    AccidentStatusesService,
    AccidentCheckpointsService,
    AccidentTypesService,
    AccidentsService,
    DiscountService,
  ],
})
export class AccidentsModule {
}
