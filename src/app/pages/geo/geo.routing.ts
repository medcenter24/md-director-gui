/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { GeoComponent } from './geo.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { CityDatatableComponent } from '../../components/city/components/datatable/city.datatable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: GeoComponent,
    children: [
      { path: 'cities', component: CityDatatableComponent },
      { path: 'hospitals', component: HospitalsComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
