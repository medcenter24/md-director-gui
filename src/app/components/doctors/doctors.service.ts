/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { HttpService } from '../http/http.service';
import { City } from '../city/city';

@Injectable()
export class DoctorsService extends HttpService {

  protected getPrefix(): string {
    return 'director/doctors';
  }
  
  getDoctors(): Promise<Doctor[]> {
    return this.get().then(response => response.json().data as Doctor[]);
  }

  getDoctor(id: number): Promise<Doctor> {
    return this.get(id).then(response => response.json().data as Doctor);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(doctor: Doctor): Promise<Doctor> {
    return this.store(doctor).then(res => res.json() as Doctor);
  }

  update(doctor: Doctor): Promise<Doctor> {
    return this.put(doctor.id, doctor);
  }

  getDoctorCities(id: number): Promise<City[]> {
    return this.get(`${id}/cities`).then(res => res.json().data as City[]);
  }

  setDoctorCities(id: number, cities: City[]): Promise<any> {
    let els = [];
    if (cities) {
      els = cities.map(x => x.id);
    }
    return this.http
      .put(`${this.getUrl(id)}/cities`, JSON.stringify({ cities: els }), { headers: this.getAuthHeaders() })
      .toPromise()
      .catch(error => this.handleError(error));
  }

  getDoctorsByCity(cityId: number): Promise<Doctor[]> {
    return this.get(`cities/${cityId}`).then(res => res.json().data as Doctor[]);
  }
}
