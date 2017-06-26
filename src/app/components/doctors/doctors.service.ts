/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Doctor} from "./doctor";
import { HttpService } from '../http/http.service';

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
}
