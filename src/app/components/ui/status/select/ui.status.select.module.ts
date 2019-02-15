/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../app.translation.module';
import { UiStatusSelectComponent } from './ui.status.select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DropdownModule,
  ],
  declarations: [
    UiStatusSelectComponent,
  ],
  exports: [
    UiStatusSelectComponent,
  ],
})
export class UiStatusSelectModule {}
