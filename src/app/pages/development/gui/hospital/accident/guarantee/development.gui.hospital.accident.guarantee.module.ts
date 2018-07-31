/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HaAssistantGuaranteeModule }
  from '../../../../../../components/hospitalAccident/components/assistantGuaranteeFile';
import { NgaModule } from '../../../../../../theme/nga.module';
import { DevelopmentGuiHospitalAccidentGuaranteeComponent }
  from './development.gui.hospital.accident.guarantee.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    HaAssistantGuaranteeModule,
  ],
  declarations: [
    DevelopmentGuiHospitalAccidentGuaranteeComponent,
  ],
  exports: [
    DevelopmentGuiHospitalAccidentGuaranteeComponent,
  ],
  providers: [
  ],
})
export class DevelopmentGuiHospitalAccidentGuaranteeModule {

}
