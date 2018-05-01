/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export interface LoadableServiceInterface {
  /**
   * Search data with parameters
   * @param {Object} filters
   * @returns {Promise<any>}
   */
  searchData(filters: Object): Promise<any>;

  /**
   * Save model
   * @param {Object} model
   * @returns {Promise<any>}
   */
  save(model: Object): Promise<any>;

  /**
   * Destroy model
   * @param {Object} model
   * @returns {Promise<any>}
   */
  destroy(model: Object): Promise<any>;
}
