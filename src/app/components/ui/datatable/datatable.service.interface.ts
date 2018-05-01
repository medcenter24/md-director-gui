/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export interface DatatableServiceInterface {
  find(filters: Object): Promise<any>;
  save(model: Object): Promise<any>;
  destroy(model: Object): Promise<any>;
}
