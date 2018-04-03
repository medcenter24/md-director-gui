/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class DatatableAction {
  constructor (
    public title: string = '',
    public icon: string = '',
    public run: Function = function () {},
  ) { }
}
