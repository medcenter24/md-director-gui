/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

export class HospitalAccident {

  constructor (
    public id: number = 0,
    public accidentId: number = 0,
    public hospitalId: number = 0,
    public hospitalGuaranteeId: number = 0,
    public hospitalInvoiceId: number = 0,
    public createdAt: string = '',
    public updatedAt: string = '',
    public deletedAt: string = '',
  ) { }
}
