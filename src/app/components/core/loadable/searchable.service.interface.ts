/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchFilter } from './search.filter';

export interface SearchableServiceInterface {
  /**
   * Search data with parameters
   * @param {Object} filters
   * @returns {Promise<any>}
   */
  search(filters: SearchFilter): Promise<any>;
}
