/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
