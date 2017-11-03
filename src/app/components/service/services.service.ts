/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Service } from './service';
import { HttpService } from '../http/http.service';

@Injectable()
export class ServicesService extends HttpService {
  
  protected getPrefix(): string {
    return 'director/services';
  }

  getServices(): Promise<Service[]> {
    return this.get().then(response => response.json().data as Service[]);
  }

  getService(id: number): Promise<Service> {
    return this.get(id).then(response => response.json().data as Service);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(service: Service): Promise<Service> {
    return this.store(service).then(res => res.json().data as Service);
  }

  update(service: Service): Promise<Service> {
    return this.put(service.id, service);
  }
}
