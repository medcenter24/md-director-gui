/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Accident } from './accident';
import { HttpService } from '../http/http.service';

@Injectable()
export class AccidentsService extends HttpService {

  protected getPrefix (): string {
    return 'director/accidents';
  }

  getAccidents(): Promise<Accident[]> {
    return this.get()
        .then(response => response.json().data as Accident[]);
  }

  getAccident(id: number): Promise<Accident> {
    return this.get(id)
        .then(response => response.json().data as Accident);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(accident: Accident): Promise<Accident> {
    return this.store(accident).then(res => res.json().data as Accident);
  }

  update(accident: Accident): Promise<Accident> {
    return this.put(accident.id, accident);
  }
}
