/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

export interface SearchableServiceInterface {
  /**
   * Search data with parameters
   * @param {Object} filters
   * @returns {Promise<any>}
   */
  search(filters: Object): Promise<any>;
}
