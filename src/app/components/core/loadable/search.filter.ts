/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Configurable } from '../configurable';

export class SearchFilter extends Configurable {

  constructor (
    /**
     * `Offset for the data slice
     * Searching can work with parameter 'first' or with parameter 'page', 'first' parameter has priority
     * @type {boolean}
     */
    public first: number = null,
    /**
     * `Amount of rows to select
     * alias to limit
     * @type {number}
     */
    public rows: number = 25,
    /**
     * Page number
     * @type {number}
     */
    public page: number = 0,
    /**
     * `Field to sorting results
     * @type {string}
     */
    public sortField: string = '',
    /**
     * `Ordering results ASC or DESC
     * if > 0 = ASC or = DESC
     * @type {number}
     */
    public sortOrder: number = 1,
    /**
     * `Fields for the filtering
     * @type {any[]}
     */
    public fields: string[] = [],
    /**
     * Query for the filtering
     * @type {string}
     */
    public query: string = '',
  ) {
    super();
  }
}
