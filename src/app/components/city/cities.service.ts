/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { City } from './city';
import { HttpService } from '../core/http/http.service';

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

  save (city: City): Promise<City> {
    const action = city.id ? this.put(city.id, city) : this.store(city);
    return action.then(response => response.data as City);
  }

  destroy (city: City): Promise<any> {
    return this.remove(city.id);
  }
}
