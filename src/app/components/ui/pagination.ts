/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Pagination {
  constructor (
      public show: boolean = false,
      public rows: number = 0,
      public rowsPerPage: Array<number> = [10, 50, 100],
      public total: number = 0,
      public first: number = 0,
  ) {}
}