/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { AccidentStatus } from './status';
import { HttpService } from '../../../core/http/http.service';

@Injectable()
export class AccidentStatusesService extends HttpService {

  protected getPrefix(): string {
    return 'director/statuses';
  }

  getStatuses(): Promise<AccidentStatus[]> {
    return this.get()
      .then(response => response.data as AccidentStatus[]);
  }

  getStatus(id: number): Promise<AccidentStatus> {
    return this.get(id)
      .then(response => response.data as AccidentStatus);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(status: AccidentStatus): Promise<AccidentStatus> {
    return this.store(status).then(res => res.data as AccidentStatus);
  }

  update(status: AccidentStatus): Promise<AccidentStatus> {
    return this.put(status.id, status);
  }
}
