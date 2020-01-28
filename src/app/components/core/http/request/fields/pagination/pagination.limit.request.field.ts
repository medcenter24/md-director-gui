/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { RequestField } from '../../request.field';

export class PaginationLimitRequestField extends RequestField {

  static FIELD_NAME = 'limit';
  static FIELD_PREFIX = '_pnl_';

  constructor (
    public value: string = '',
  ) {
    super(PaginationLimitRequestField.FIELD_NAME, value);
  }

  getFieldPrefix (): string {
    return PaginationLimitRequestField.FIELD_PREFIX;
  }

  setValue ( val: string ): void {
    const nVal = +val;
    super.setValue( `${nVal}` );
  }

  toUrl(): string {
    const uriField = encodeURIComponent(this.getField());
    if (!uriField.length) {
      throw new Error('Undefined field property');
    }

    const uriValue = encodeURIComponent(this.getValue());
    return uriValue ? `${uriField}=${uriValue}` : '';
  }
}
