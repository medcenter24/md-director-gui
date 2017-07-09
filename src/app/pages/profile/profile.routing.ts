/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from './profile.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [{
  path: '',
  component: ProfileComponent,
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
