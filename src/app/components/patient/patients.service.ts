/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Patient } from './patient';
import { HttpService } from '../http/http.service';

@Injectable()
export class PatientsService extends HttpService {

  protected getPrefix(): string {
    return 'director/patients';
  }
  
  getPatients(): Promise<Patient[]> {
    return this.get().then(response => response.json().data as Patient[]);
  }

  getPatient(id: number): Promise<Patient> {
    return this.get(id).then(response => response.json().data as Patient);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(patient: Patient): Promise<Patient> {
    return this.store(patient).then(res => res.json() as Patient);
  }

  update(patient: Patient): Promise<Patient> {
    return this.put(patient.id, patient);
  }
}
