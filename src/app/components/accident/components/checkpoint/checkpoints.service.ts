/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { AccidentCheckpoint } from './checkpoint';
import { HttpService } from '../../../http/http.service';

@Injectable()
export class AccidentCheckpointsService extends HttpService {

  protected getPrefix(): string {
    return 'director/checkpoints';
  }

  getCheckpoints(): Promise<AccidentCheckpoint[]> {
    return this.get()
      .then(response => response.data as AccidentCheckpoint[]);
  }

  save (checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    const action = checkpoint.id ? this.put(checkpoint.id, checkpoint) : this.store(checkpoint);
    return action.then(response => response.data as AccidentCheckpoint);
  }

  destroy (checkpoint: AccidentCheckpoint): Promise<any> {
    return this.remove(checkpoint.id);
  }
}
