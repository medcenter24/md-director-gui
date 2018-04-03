/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { AccidentType } from './type';
import { HttpService } from '../../../http/http.service';

@Injectable()
export class AccidentTypesService extends HttpService {

  protected getPrefix(): string {
    return 'director/types';
  }
  
  getTypes(): Promise<AccidentType[]> {
    return this.get()
      .then(response => response.data as AccidentType[]);
  }

  getType(id: number): Promise<AccidentType> {
    return this.get(id)
      .then(response => response.data as AccidentType);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(type: AccidentType): Promise<AccidentType> {
    return this.store(type).then(res => res.data as AccidentType);
  }

  update(type: AccidentType): Promise<AccidentType> {
    return this.put(type.id, type);
  }
}
