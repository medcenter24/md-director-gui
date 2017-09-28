/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DoctorsComponent } from './doctors.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { DoctorServicesComponent } from './components/services/services.component';
import { StuffComponent } from './components/stuff/stuff.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: DoctorsComponent,
        children: [
            { path: 'diagnostics', component: DiagnosticsComponent },
            { path: 'services', component: DoctorServicesComponent },
            { path: 'stuff', component: StuffComponent },
        ],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
