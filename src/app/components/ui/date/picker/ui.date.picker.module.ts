/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { NgModule } from '@angular/core';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UiDatePickerComponent } from './ui.date.picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    Ng2FlatpickrModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
  declarations: [
    UiDatePickerComponent,
  ],
  exports: [
    UiDatePickerComponent,
  ],
})
export class UiDatePickerModule {

}
