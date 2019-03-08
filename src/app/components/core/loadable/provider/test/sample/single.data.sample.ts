/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
