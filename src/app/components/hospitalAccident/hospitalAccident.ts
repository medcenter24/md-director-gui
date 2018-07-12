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
    public hospitalGuaranteeId: number = 0,
    public hospitalInvoiceId: number = 0,
    public assistantInvoiceId: number = 0,
    public assisntantGuaranteeId: number = 0,
    public createdAt: string = '',
    public updatedAt: string = '',
    public deletedAt: string = '',
  ) { }
}
