/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule }  from '@angular/router';

import { Geo } from './geo.component';
import { Cities } from './components/cities/cities.component';
import { Hotels } from './components/hotels/hotels.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Geo,
    children: [
      { path: 'cities', component: Cities },
      { path: 'hotels', component: Hotels }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
