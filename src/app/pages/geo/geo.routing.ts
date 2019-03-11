/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { GeoComponent } from './geo.component';
import { CityDatatableComponent } from '../../components/city/components/datatable/city.datatable.component';
import { HospitalDatatableComponent }
  from '../../components/hospital/components/datatable/hospital.datatable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: GeoComponent,
    children: [
      { path: 'cities', component: CityDatatableComponent },
      { path: 'hospitals', component: HospitalDatatableComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
