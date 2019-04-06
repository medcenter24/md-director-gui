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
import { Assistant } from './assistant';
import { HttpService } from '../core/http/http.service';

@Injectable()
export class AssistantsService extends HttpService {

  protected getPrefix(): string {
    return 'director/assistants';
  }

  /*getAssistants(): Promise<Assistant[]> {
    return this.get()
      .then(response => response.data as Assistant[]);
  }


  getAssistant(id: number): Promise<Assistant> {
    return this.get(id)
      .then(response => response.data as Assistant);
  }*/

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(assistant: Assistant): Promise<Assistant> {
    return this.store(assistant).then(res => res.data as Assistant);
  }

  update(assistant: Assistant): Promise<Assistant> {
    return this.put(assistant.id, assistant);
  }

  save (assistant: Assistant): Promise<any> {
    return assistant.id ? this.put(assistant.id, assistant) : this.store(assistant);
  }
}
