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

import { Injectable } from '@angular/core';
import { City } from './city';
import { HttpService } from '../core/http/http.service';

@Injectable()
export class CitiesService extends HttpService {

  protected getPrefix(): string {
    return 'director/cities';
  }

  getCities(): Promise<City[]> {
    return this.get().then(response => response.data as City[]);
  }

  getCity (id: number): Promise<City> {
    return this.get(id).then(response => response.data as City);
  }

  delete (id: number): Promise<void> {
    return this.remove(id);
  }

  create (city: City): Promise<City> {
    return this.store(city).then(res => res.json() as City);
  }

  update (city: City): Promise<City> {
    return this.put(city.id, city);
  }

  save (city: City): Promise<City> {
    const action = city.id ? this.put(city.id, city) : this.store(city);
    return action.then(response => response.data as City);
  }

  destroy (city: City): Promise<any> {
    return this.remove(city.id);
  }
}
