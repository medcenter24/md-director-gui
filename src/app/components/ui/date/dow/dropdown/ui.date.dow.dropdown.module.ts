/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../../app.translation.module';
import { UiDateDowDropdownComponent } from './ui.date.dow.dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DropdownModule,
  ],
  declarations: [
    UiDateDowDropdownComponent,
  ],
  exports: [
    UiDateDowDropdownComponent,
  ],
})
export class UiDateDowDropdownModule {
}
