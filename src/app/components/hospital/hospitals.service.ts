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
import { Hospital } from './hospital';
import { HttpService } from '../core/http/http.service';

@Injectable()
export class HospitalsService extends HttpService {

  protected getPrefix(): string {
    return 'director/hospitals';
  }

  getHospitals(): Promise<Hospital[]> {
    return this.get().then(response => response.data as Hospital[]);
  }

  getHospital(id: number): Promise<Hospital> {
    return this.get(id).then(response => response.data as Hospital);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(hospital: Hospital): Promise<Hospital> {
    return this.store(hospital).then(res => res.json() as Hospital);
  }

  update(hospital: Hospital): Promise<Hospital> {
    return this.put(hospital.id, hospital);
  }

  save (hospital: Hospital): Promise<Hospital> {
    const action = hospital.id ? this.put(hospital.id, hospital) : this.store(hospital);
    return action.then(response => response.data as Hospital);
  }

  destroy (hospital: Hospital): Promise<any> {
    return this.remove(hospital.id);
  }
}
