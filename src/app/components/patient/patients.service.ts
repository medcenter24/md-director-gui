/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Patient } from './patient';
import { HttpService } from '../http/http.service';

@Injectable()
export class PatientsService extends HttpService {

  protected getPrefix(): string {
    return 'director/patients';
  }

  getPatients(): Promise<Patient[]> {
    return this.get().then(response => response.data as Patient[]);
  }

  getPatient(id: number): Promise<Patient> {
    return this.get(id).then(response => response.data as Patient);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(patient: Patient): Promise<Patient> {
    return this.store(patient).then(res => res as Patient);
  }

  update(patient: Patient): Promise<Patient> {
    return this.put(patient.id, patient);
  }

  formatPatientName(name: string): string {
      name = name.toUpperCase();
      name = this.filterNameCharacters(name);
      return name;
  }

  filterNameCharacters(name: string): string {
    name = name.replace(/[^A-Z\s]/g, '');
    name = name.replace(/\s+/g, ' ');
    return name;
  }
}
