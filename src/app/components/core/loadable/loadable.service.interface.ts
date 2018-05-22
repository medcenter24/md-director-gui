/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { SearchableServiceInterface } from './searchable.service.interface';

export interface LoadableServiceInterface extends SearchableServiceInterface {
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
