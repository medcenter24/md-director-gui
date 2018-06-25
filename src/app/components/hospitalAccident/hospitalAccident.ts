/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class HospitalAccident {

  constructor (
    public id: number = 0,
    public accidentId: number = 0,
    public hospitalId: number = 0,
    public guaranteeId: number = 0,
    public invoiceId: number = 0,
    public formReportId: number = 0,
    public createdAt: string = '',
    public updatedAt: string = '',
    public deletedAt: string = '',
  ) { }
}
