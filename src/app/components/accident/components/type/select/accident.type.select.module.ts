/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/primeng';
import { AccidentTypeSelectComponent } from './accident.type.select.component';
import { AccidentTypesService } from '../types.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
  ],
  declarations: [AccidentTypeSelectComponent],
  exports: [AccidentTypeSelectComponent],
  providers: [
    AccidentTypesService,
  ],
})
export class AccidentTypeSelectModule {
}