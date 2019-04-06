/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpService } from '../core/http/http.service';
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
