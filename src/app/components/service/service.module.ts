/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AppTranslationModule } from '../../app.translation.module';
import { AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesSelectorComponent } from './components/selector/selector.component';
import { ServicesService } from './services.service';
import { SelectServicesComponent } from './components/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AutoCompleteModule,
    MultiSelectModule,
  ],
  declarations: [
    SelectServicesComponent,
    ServicesSelectorComponent,
  ],
  providers: [
    ServicesService,
  ],
  exports: [
    ServicesSelectorComponent,
    SelectServicesComponent,
  ],
})
export class ServiceModule {
}
