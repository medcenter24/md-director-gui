/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/pages/dashboard', canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
