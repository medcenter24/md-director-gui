/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

/**
 * Transform data before demonstration
 *  - field - transformable column in the datatable
 *  - transform - transformer which returns transformed string
 */
export class DatatableTransformer {
  constructor(
    public field: string = '',
    public transform: Function = function (value) { return value; },
  ) { }
}
