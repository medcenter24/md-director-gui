import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../components/auth/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

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
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'accidents', loadChildren: 'app/pages/accidents/accidents.module#AccidentsModule',
        canActivate: [AuthGuard] },
      { path: 'geo', loadChildren: 'app/pages/geo/geo.module#GeoModule', canActivate: [AuthGuard] },
      { path: 'doctors', loadChildren: 'app/pages/doctors/doctors.module#DoctorsModule', canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard] },
      { path: 'cases', loadChildren: 'app/pages/cases/cases.module#CasesModule', canActivate: [AuthGuard] },
      { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
      { path: 'companions', loadChildren: 'app/pages/companions/companions.module#CompanionsModule',
        canActivate: [AuthGuard] },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
