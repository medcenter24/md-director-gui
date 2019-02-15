/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Service {
  constructor (public id: number = 0,
               public title: string = '',
               public description: string = '',
               public diseaseCode: string = '',
               // who created ^ doctor or director
               public type: string = '') {
  }
}
