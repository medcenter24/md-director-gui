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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormService } from '../../../forms';
import { AutocompleterModule } from '../../../ui/selector/components/autocompleter';
import { UiStatusSelectModule } from '../../../ui/status/select';
import { DownloadFileModule } from '../../../upload/components/download';
import { UploadFileModule } from '../../../upload/components/file';
import { InvoiceService } from '../../invoice.service';
import { InvoiceEditorComponent } from './invoice.editor.component';
import { FormViewerModule } from '../../../forms/components/viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    InputTextModule,
    AutocompleterModule,
    UploadFileModule,
    DownloadFileModule,
    ButtonModule,
    UiStatusSelectModule,
    KeyFilterModule,
    FormViewerModule,
  ],
  declarations: [
    InvoiceEditorComponent,
  ],
  exports: [
    InvoiceEditorComponent,
  ],
  providers: [
    FormService,
    InvoiceService,
  ],
})
export class InvoiceEditorModule {

}
