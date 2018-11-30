/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class DoctorAccident {

  constructor (
      public id: number = 0,
      public doctorId: number = 0,
      public recommendation: string = '',
      public investigation: string = '',
      public visitTime: string = '',
      public createdAt: string = '',
  ) { }
}
