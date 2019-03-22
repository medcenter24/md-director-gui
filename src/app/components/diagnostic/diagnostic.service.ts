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
import { Diagnostic } from './diagnostic';
import { HttpService } from '../core/http/http.service';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class DiagnosticService extends HttpService implements LoadableServiceInterface {

  protected getPrefix(): string {
    return 'director/diagnostics';
  }

  getDiagnostics(): Promise<Diagnostic[]> {
    return this.get().then(response => response.data as Diagnostic[]);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  save(diagnostic: Diagnostic): Promise<Diagnostic> {
    return diagnostic.id
      ? this.put(diagnostic.id, diagnostic).then(res => res.data as Diagnostic)
      : this.store(diagnostic);
  }

  destroy(diagnostic: Diagnostic): Promise<any> {
    return this.remove(diagnostic.id);
  }
}
