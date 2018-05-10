/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { HttpService } from '../http/http.service';
import { City } from '../city/city';
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
