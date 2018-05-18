/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppTranslationModule } from '../../../../app.translation.module';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '../../../ui/datatable';
import { ConfirmDialogModule, InputMaskModule } from 'primeng/primeng';
import { ServicesService } from '../../services.service';
import { ServiceDatatableComponent } from './service.datatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DialogModule,
    ButtonModule,
    DatatableModule,
    InputMaskModule,
    ConfirmDialogModule,
],
  providers: [
    ServicesService,
  ],
  declarations: [
    ServiceDatatableComponent,
  ],
  exports: [
    ServiceDatatableComponent,
  ],
})
export class ServiceDatatableModule {
}
