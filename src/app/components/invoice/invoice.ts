/*
 * Copyright (c) 2018.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Invoice {
  constructor(
    public id: number = 0,
    public price: number = 0,
    public type: string = 'form', // form or file
    public title: string = '',
    public status: string = 'new', // new, sent, paid
  ) {}
}
