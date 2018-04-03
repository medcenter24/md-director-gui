/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Accident } from './accident';
import { HttpService } from '../http/http.service';

@Injectable()
export class AccidentsService extends HttpService {

  protected getPrefix (): string {
    return 'director/accidents';
  }

  getAccidents(): Promise<Accident[]> {
    return this.get()
        .then(response => response.data as Accident[]);
  }

  getAccident(id: number): Promise<Accident> {
    return this.get(id)
        .then(response => response.data as Accident);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(accident: Accident): Promise<Accident> {
    return this.store(accident).then(res => res.data as Accident);
  }

  update(accident: Accident): Promise<Accident> {
    return this.put(accident.id, accident);
  }
}
