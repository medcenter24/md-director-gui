/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Assistant } from './assistant';
import { HttpService } from '../http/http.service';

@Injectable()
export class AssistantsService extends HttpService{

  protected getPrefix(): string {
    return 'director/assistants';
  }
  
  getAssistants(): Promise<Assistant[]> {
    return this.get()
      .then(response => response.json().data as Assistant[]);
  }


  getAssistant(id: number): Promise<Assistant> {
    return this.get(id)
      .then(response => response.json().data as Assistant);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(assistant: Assistant): Promise<Assistant> {
    return this.store(assistant).then(res => res.json().data as Assistant);
  }

  update(assistant: Assistant): Promise<Assistant> {
    return this.put(assistant.id, assistant);
  }
}
