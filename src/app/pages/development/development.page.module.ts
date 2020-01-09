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
import { DevelopmentPageComponent } from './development.page.component';
import { routing } from './development.page.routing';
import { DevelopmentGuiModule } from './gui';
import { DevelopmentGuiInvoiceModule } from './gui/invoice';
import { DevelopmentGuiMultiselectModule } from './gui/multiselect';
import { MultiselectImplementationsModule } from './gui/multiselect/implementations';
import { DevelopmentGuiAutocompleterModule } from './gui/autocompleter';
import { GuiPaymentBlockModule } from './gui/payment/block';
import { DevelopmentGuiUploaderFileModule } from './gui/uploader/file';
import { GuiDialogDeleteModule } from './gui/dialog/delete';
import { DevelopmentDatatablePreviewModule } from './gui/datatable';

@NgModule({
  imports: [
    routing,
    DevelopmentGuiModule,
    DevelopmentGuiMultiselectModule,
    MultiselectImplementationsModule,
    DevelopmentGuiAutocompleterModule,
    DevelopmentGuiUploaderFileModule,
    DevelopmentGuiInvoiceModule,
    GuiPaymentBlockModule,
    GuiDialogDeleteModule,
    DevelopmentDatatablePreviewModule,
  ],
  declarations: [
    DevelopmentPageComponent,
  ],
})
export class DevelopmentPageModule {
}
