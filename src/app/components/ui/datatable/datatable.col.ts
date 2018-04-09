/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class DatatableCol {
  constructor (
    // key to get from the object
    public field: string = '',
    // title to show
    public header: string = '',
  ) {}
}
