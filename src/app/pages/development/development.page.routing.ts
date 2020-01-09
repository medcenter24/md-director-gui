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

import { RouterModule, Routes } from '@angular/router';
import { DevelopmentPageComponent } from './development.page.component';
import { ModuleWithProviders } from '@angular/core';
import { DevelopmentGuiComponent } from './gui';
import { DevelopmentGuiInvoiceComponent } from './gui/invoice';
import { DevelopmentGuiMultiselectComponent } from './gui/multiselect';
import { MultiselectImplementationsComponent } from './gui/multiselect/implementations';
import { DevelopmentGuiAutocompleterComponent } from './gui/autocompleter';
import { GuiPaymentBlockComponent } from './gui/payment/block';
import { DevelopmentGuiUploaderFileComponent } from './gui/uploader/file';
import { GuiDialogDeleteComponent } from './gui/dialog/delete';
import { DevelopmentDatatablePreviewComponent } from './gui/datatable';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DevelopmentPageComponent,
    children: [
      { path: 'gui', component: DevelopmentGuiComponent },
      { path: 'gui/multiselect', component: DevelopmentGuiMultiselectComponent },
      { path: 'gui/multiselect/implementations', component: MultiselectImplementationsComponent },
      { path: 'gui/autocompleter', component: DevelopmentGuiAutocompleterComponent },
      { path: 'gui/uploader/file', component: DevelopmentGuiUploaderFileComponent },
      { path: 'gui/invoice', component: DevelopmentGuiInvoiceComponent },
      { path: 'gui/payment/block', component: GuiPaymentBlockComponent },
      { path: 'gui/dialog/delete', component: GuiDialogDeleteComponent },
      { path: 'gui/datatable/preview', component: DevelopmentDatatablePreviewComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
