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
import { Doctor } from './doctor';
import { HttpService } from '../core/http/http.service';
import { City } from '../city';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class DoctorsService extends HttpService implements LoadableServiceInterface {

  protected getPrefix(): string {
    return 'director/doctors';
  }

  getDoctors(): Promise<Doctor[]> {
    return this.get().then(response => response.data as Doctor[]);
  }

  getDoctor(id: number): Promise<Doctor> {
    return this.get(id).then(response => response.data as Doctor);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(doctor: Doctor): Promise<Doctor> {
    return this.store(doctor).then(res => res as Doctor);
  }

  update(doctor: Doctor): Promise<Doctor> {
    return this.put(doctor.id, doctor).then(res => res.data as Doctor);
  }

  getDoctorCities(id: number): Promise<City[]> {
    return this.get(`${id}/cities`).then(res => res.data as City[]);
  }

  setDoctorCities(id: number, cities: City[]): Promise<any> {
    return this.put(`${id}/cities`, { cities: cities.map(x => x.id) });
  }

  getDoctorsByCity(cityId: number): Promise<Doctor[]> {
    return this.get(`cities/${cityId}`).then(res => res.data as Doctor[]);
  }

  save (doctor: Doctor): Promise<Doctor> {
    const action = doctor.id ? this.put(doctor.id, doctor) : this.store(doctor);
    return action.then(response => response.data as Doctor);
  }

  destroy (doctor: Doctor): Promise<any> {
    return this.remove(doctor.id);
  }
}
