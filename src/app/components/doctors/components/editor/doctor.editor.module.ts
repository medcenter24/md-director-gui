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
import { DoctorEditorComponent } from './doctor.editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { UserSelectModule } from '../../../users/select';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserEditorModule } from '../../../users/editor';
import { DiagnosticCategoryEditorModule } from '../../../diagnostic/category/components/editor';
import { MultiSelectorModule } from '../../../ui/selector/components/multiSelector';
import { DoctorsService } from '../../doctors.service';
import { CitiesService } from '../../../city';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    UserSelectModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    UserEditorModule,
    DiagnosticCategoryEditorModule,
    MultiSelectorModule,
  ],
  providers: [
    DoctorsService,
    CitiesService,
    TranslateService,
  ],
  exports: [
    DoctorEditorComponent,
  ],
  declarations: [
    DoctorEditorComponent,
  ],
})
export class DoctorEditorModule {
}
