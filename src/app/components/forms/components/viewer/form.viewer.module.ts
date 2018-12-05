/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormService } from '../../form.service';
import { FormViewerComponent } from './form.viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DialogModule,
  ],
  providers: [
    FormService,
  ],
  declarations: [
    FormViewerComponent,
  ],
  exports: [
    FormViewerComponent,
  ],
})
export class FormViewerModule {

}
