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
import { ImporterComponent } from './importer.component';
import { ImporterService } from './importer.service';
import { ButtonModule, CheckboxModule, ConfirmDialogModule, DialogModule, FileUploadModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../app.translation.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DialogModule,
    FileUploadModule,
    ConfirmDialogModule,
    ButtonModule,
    CheckboxModule,
  ],
  declarations: [
    ImporterComponent,
  ],
  providers: [
    ImporterService,
  ],
  exports: [
    ImporterComponent,
  ],
})
export class ImporterModule {
}
