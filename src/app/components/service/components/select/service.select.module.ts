/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { SelectServicesComponent } from './service.select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { ServicesService } from '../../services.service';
import { MultiSelectModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    MultiSelectModule,
  ],
  providers: [
    ServicesService,
  ],
  declarations: [
    SelectServicesComponent,
  ],
  exports: [
    SelectServicesComponent,
  ],
})
export class ServiceSelectModule {
}
