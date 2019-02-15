/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchableServiceInterface } from '../../../searchable.service.interface';
import { SearchFilter } from '../../../search.filter';

export class PaginationDataSample implements SearchableServiceInterface {

  private numTry: number = 0;

  private data: any[] = [{
    id: 1,
    name: 'Peter',
    description: 'doctor',
  }, {
    id: 2,
    name: 'Foster',
    description: 'director',
  }, {
    id: 3,
    name: 'Abigail',
    description: 'user',
  }];

  search(filters: SearchFilter): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.numTry++;
      resolve({
        // pretty simple pagination
        data: this.data.slice(filters.first, filters.first + filters.rows),
      });
    });
  }

  getNumTry(): number {
    return this.numTry;
  }
}
