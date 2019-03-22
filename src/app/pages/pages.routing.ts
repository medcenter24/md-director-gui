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

import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../components/auth/auth.guard';
import { PageNotFoundComponent } from './page.not.found.component';

// export function loadChildren(path) { return System.import(path); };

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'profile',
    loadChildren: 'app/pages/profile/profile.module#ProfileModule',
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: 'settings', loadChildren: 'app/pages/settings/settings.module#SettingsModule',
        canActivate: [AuthGuard] },
      { path: 'finance', loadChildren: 'app/pages/finance/finance.module#FinanceModule',
        canActivate: [AuthGuard] },
      { path: 'geo', loadChildren: 'app/pages/geo/geo.module#GeoModule', canActivate: [AuthGuard] },
      { path: 'doctors', loadChildren: 'app/pages/doctors/doctors.module#DoctorsModule', canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard] },
      { path: 'cases', loadChildren: 'app/pages/cases/cases.page.module#CasesPageModule', canActivate: [AuthGuard] },
      { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
      { path: 'companions', loadChildren: 'app/pages/companions/companions.page.module#CompanionsPageModule',
        canActivate: [AuthGuard] },
      { path: 'development', loadChildren: 'app/pages/development/development.page.module#DevelopmentPageModule',
        canActivate: [AuthGuard]},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
