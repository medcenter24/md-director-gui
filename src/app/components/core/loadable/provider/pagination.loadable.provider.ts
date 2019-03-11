/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchableServiceInterface } from '../searchable.service.interface';
import { SearchFilter } from '../search.filter';

export class PaginationLoadableProvider implements SearchableServiceInterface {

  constructor(
    public config: SearchableServiceInterface,
  ) { }

  search(filters: SearchFilter): Promise<any> {
    return this.config.search(filters);
  }
}
