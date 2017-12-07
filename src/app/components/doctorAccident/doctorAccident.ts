/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class DoctorAccident {

  constructor (
      public id: number = 0,
      public accident_id: number = 0,
      public accident_status_id: number = 0,
      public doctor_id: number = 0,
      public city_id: number = 0,
      public status: string = '',
      public diagnose: string = '',
      public visit_time: string = '',
      public created_at: string = '',
      public updated_at: string = '',
      public deleted_at: string = '',
  ) { }
}
