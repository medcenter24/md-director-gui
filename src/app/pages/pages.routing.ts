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
