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

export class RequestField {

  constructor (
    public field: string,
    public value: string = '',
  ) {
  }

  getFieldPrefix(): string {
    return '';
  }

  toUrl(): string {
    const uriField = encodeURIComponent(this.getField());
    if (!uriField.length) {
      throw new Error('Undefined field property');
    }
    const uriValue = encodeURIComponent(this.getValue());
    return uriValue && uriValue !== 'null' ? `${uriField}=${uriValue}` : '';
  }

  getField(): string {
    return `${this.getFieldPrefix()}${this.field}`;
  }

  getValue(): string {
    return this.value;
  }

  setValue(val: string): void {
    this.value = val;
  }

  isActive(): boolean {
    return true;
  }
}
