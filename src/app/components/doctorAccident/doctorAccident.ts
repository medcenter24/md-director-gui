/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class DoctorAccident {

  id: number = 0;
  accident_id: number = 0;
  accident_status_id: number = 0;
  doctor_id: number = 0;
  city_id: number = 0;
  status: string = '';
  diagnose: string = '';
  created_at: string = '';
  updated_at: string = '';
  deleted_at: string = '';

  constructor (id: number = 0,
               accident_id: number = 0,
               accident_status_id: number = 0,
               doctor_id: number = 0,
               city_id: number = 0,
               status: string = '',
               diagnose: string = '',
               created_at: string = '',
               updated_at: string = '',
               deleted_at: string = '') {
    this.id = id;
    this.accident_id = accident_id;
    this.accident_status_id = accident_status_id;
    this.doctor_id = doctor_id;
    this.city_id = city_id;
    this.status = status;
    this.diagnose = diagnose;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
