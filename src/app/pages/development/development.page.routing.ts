/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { RouterModule, Routes } from '@angular/router';
import { DevelopmentPageComponent } from './development.page.component';
import { ModuleWithProviders } from '@angular/core';
import { DevelopmentGuiComponent } from './gui';
import { DevelopmentGuiMultiselectComponent } from './gui/multiselect';
import { MultiselectImplementationsComponent } from './gui/multiselect/implementations';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DevelopmentPageComponent,
    children: [
      { path: 'gui', component: DevelopmentGuiComponent },
      { path: 'gui/multiselect', component: DevelopmentGuiMultiselectComponent },
      { path: 'gui/multiselect/implementations', component: MultiselectImplementationsComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
