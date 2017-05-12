/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class HospitalAccident {

  id: number = 0;
  accident_id: number = 0;
  accident_status_id: number = 0;
  hospital_id: number = 0;
  guarantee_id: number = 0;
  invoice_id: number = 0;
  form_report_id: number = 0;
  status: string = '';
  created_at: string = '';
  updated_at: string = '';
  deleted_at: string = '';

  constructor (id: number = 0,
               accident_id: number = 0,
               accident_status_id: number = 0,
               hospital_id: number = 0,
               guarantee_id: number = 0,
               invoice_id: number = 0,
               form_report_id: number = 0,
               status: string = '',
               created_at: string = '',
               updated_at: string = '',
               deleted_at: string = '') {

    this.id = id;
    this.accident_id = accident_id;
    this.accident_status_id = accident_status_id;
    this.hospital_id = hospital_id;
    this.guarantee_id = guarantee_id;
    this.invoice_id = invoice_id;
    this.form_report_id = form_report_id;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
