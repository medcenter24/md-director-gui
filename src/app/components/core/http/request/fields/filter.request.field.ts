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

import { RequestField } from '../request.field';
import { AutoCompleteSrcConfig } from '../../../../ui/autosuggest/src';

export class FilterRequestField extends RequestField {

  static MATCHES = [
    'eq', // =
    'like', // like ''
    'like%', // like 'search%'
    '%like%', // like '%search%'
    '%like', // like '%search'
    'lt', // <
    'lte', // <=
    'gt', // >
    'gte', // >=
    'in', // in ('val1', 'val2')
    'between', // between val1 and val2
  ];

  static DEFAULT_MATCH = 'eq';

  static EL_TYPES = [
    'text',
    'dateRange',
    'select',
    'multipleSelect',
  ];

  static DEFAULT_EL_TYPE = 'text';

  static FIELD_PREFIX = '_fl_';

  constructor (
    public field: string,
    public value: string = '',
    public match: string = 'eq',
    public elType: string = 'text', // type of filtering @see getType() method
    public autoCompleteConf: AutoCompleteSrcConfig = null, // for elType select or multipleSelect
  ) {
    super(field, value);
  }

  getFieldPrefix (): string {
    return FilterRequestField.FIELD_PREFIX;
  }

  getMatch(): string {
    return FilterRequestField.MATCHES.includes(this.match) ? this.match : FilterRequestField.DEFAULT_MATCH;
  }

  getElType(): string {
    return FilterRequestField.EL_TYPES.includes(this.elType) ? this.elType : FilterRequestField.DEFAULT_EL_TYPE;
  }

  isActive (): boolean {
    return this.getValue() !== '';
  }

  getAutoCompleteConf(): AutoCompleteSrcConfig {
    return this.autoCompleteConf;
  }
}
