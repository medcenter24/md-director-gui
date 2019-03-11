/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
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
