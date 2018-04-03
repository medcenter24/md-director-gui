/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { City } from './city';
import { HttpService } from '../http/http.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CitiesService extends HttpService {

  protected getPrefix(): string {
    return 'director/cities';
  }
  
  getCities(): Promise<City[]> {
    return this.get().then(response => response.data as City[]);
  }

  getCity (id: number): Promise<City> {
    return this.get(id).then(response => response.data as City);
  }

  delete (id: number): Promise<void> {
    return this.remove(id);
  }

  create (city: City): Promise<City> {
    return this.store(city).then(res => res.json() as City);
  }

  update (city: City): Promise<City> {
    return this.put(city.id, city);
  }
}
