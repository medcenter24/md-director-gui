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
import { ObjectHelper } from '../../../../../helpers/object.helper';

export class FilterRequestField extends RequestField {

  static readonly MATCH_EQ = 'eq';
  static readonly MATCH_LIKE = 'like';
  static readonly MATCH_START_WITH = 'like%';
  static readonly MATCH_ENDS_WITH = '%like';
  static readonly MATCH_CONTENTS = '%like%';
  static readonly MATCH_LESS = 'lt';
  static readonly MATCH_LESS_EQUAL = 'lte';
  static readonly MATCH_GREATER = 'gt';
  static readonly MATCH_GREATER_EQUAL = 'gte';
  static readonly MATCH_IN = 'in';
  static readonly MATCH_BETWEEN = 'between';

  static readonly MATCHES = [
    FilterRequestField.MATCH_EQ, // =
    FilterRequestField.MATCH_LIKE, // like ''
    FilterRequestField.MATCH_START_WITH, // like 'search%'
    FilterRequestField.MATCH_CONTENTS, // like '%search%'
    FilterRequestField.MATCH_ENDS_WITH, // like '%search'
    FilterRequestField.MATCH_LESS, // <
    FilterRequestField.MATCH_LESS_EQUAL, // <=
    FilterRequestField.MATCH_GREATER, // >
    FilterRequestField.MATCH_GREATER_EQUAL, // >=
    FilterRequestField.MATCH_IN, // in ('val1', 'val2')
    FilterRequestField.MATCH_BETWEEN, // between val1 and val2
  ];

  static DEFAULT_MATCH = 'eq';

  static TYPE_TEXT = 'text';
  static TYPE_DATE_RANGE = 'dateRange';
  static TYPE_SELECT = 'select';

  static EL_TYPES = [
    FilterRequestField.TYPE_TEXT,
    FilterRequestField.TYPE_DATE_RANGE,
    FilterRequestField.TYPE_SELECT,
  ];

  static DEFAULT_EL_TYPE = FilterRequestField.TYPE_TEXT;
  static FIELD_PREFIX = '_fl_';

  constructor (
    public field: string,
    public value: string = '',
    public match: string = FilterRequestField.DEFAULT_MATCH,
    public elType: string = FilterRequestField.TYPE_TEXT, // type of filtering @see getType() method
    public autoCompleteConf: AutoCompleteSrcConfig = null, // for elType select or multipleSelect
  ) {
    super( field, value );
    this.setValidType();
  }

  private setValidType(): void {
    if (
      this.getElType() === FilterRequestField.TYPE_SELECT
      && this.getAutoCompleteConf()
      && this.getAutoCompleteConf().isMultiple
      && this.getMatch() !== FilterRequestField.MATCH_IN
    ) {
      this.match = FilterRequestField.MATCH_IN;
    }
  }

  setValue ( val: string ): void {
    if (this.getElType() === FilterRequestField.TYPE_SELECT && this.getAutoCompleteConf() && val.length) {
      const preloaded = [];
      val.split(',').forEach((v: string) => {
        const field = this.getAutoCompleteConf().fieldKey;
        const obj = {};
        obj[field] = v;
        preloaded.push(obj);
      });
      this.getAutoCompleteConf().preloaded = preloaded;
    }
    super.setValue( val );
  }

  getFieldPrefix (): string {
    return FilterRequestField.FIELD_PREFIX;
  }

  getMatch (): string {
    return FilterRequestField.MATCHES.includes( this.match ) ? this.match : FilterRequestField.DEFAULT_MATCH;
  }

  getElType (): string {
    return FilterRequestField.EL_TYPES.includes( this.elType ) ? this.elType : FilterRequestField.DEFAULT_EL_TYPE;
  }

  isActive (): boolean {
    return this.getValue() !== '';
  }

  getAutoCompleteConf (): AutoCompleteSrcConfig {
    return this.autoCompleteConf;
  }
}
