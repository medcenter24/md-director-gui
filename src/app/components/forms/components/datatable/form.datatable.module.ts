/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AppTranslationModule } from '../../../../app.translation.module';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '../../../ui/datatable';
import { FormService } from '../../form.service';
import { FormDatatableComponent } from './form.datatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ButtonModule,
    DatatableModule,
  ],
  providers: [
    FormService,
  ],
  declarations: [
    FormDatatableComponent,
  ],
  exports: [
    FormDatatableComponent,
  ],
})
export class FormDatatableModule {
}
