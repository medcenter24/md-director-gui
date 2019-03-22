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

import { SearchableServiceInterface } from '../../../searchable.service.interface';
import { SearchFilter } from '../../../search.filter';

export class SingleDataSample implements SearchableServiceInterface {

  private numTry: number = 0;

  search(filters: SearchFilter): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.numTry++;
      resolve({
        data: [{
          id: 1,
          name: 'Peter',
          description: 'doctor',
        }, {
          id: 2,
          name: 'Foster',
          description: 'director',
        }],
      });
    });
  }

  getNumTry(): number {
    return this.numTry;
  }
}
