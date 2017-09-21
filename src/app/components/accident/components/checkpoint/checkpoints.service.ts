/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {AccidentCheckpoint} from "./checkpoint";
import {HttpService} from "../../../http/http.service";

@Injectable()
export class AccidentCheckpointsService extends HttpService {

  protected getPrefix(): string {
    return 'director/checkpoints';
  }

  getCheckpoints(): Promise<AccidentCheckpoint[]> {
    return this.get()
      .then(response => response.json().data as AccidentCheckpoint[]);
  }


  getCheckpoint(id: number): Promise<AccidentCheckpoint> {
    return this.get(id)
      .then(response => response.json().data as AccidentCheckpoint);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    return this.store(checkpoint).then(res => res.json().data as AccidentCheckpoint);
  }

  update(checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    return this.put(checkpoint.id, checkpoint);
  }
}
