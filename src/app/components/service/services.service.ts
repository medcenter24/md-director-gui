/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpService } from '../http/http.service';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class ServicesService extends HttpService implements LoadableServiceInterface {

  protected getPrefix(): string {
    return 'director/services';
  }

  getServices(): Promise<Service[]> {
    return this.get().then(response => response.data as Service[]);
  }

  getService(id: number): Promise<Service> {
    return this.get(id).then(response => response.data as Service);
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

  save(service: Service): Promise<Service> {
    const action = service.id ? this.put(service.id, service) : this.store(service);
    return action.then(response => response as Service);
  }

  destroy(service: Service): Promise<any> {
    return this.remove(service.id);
  }
}
