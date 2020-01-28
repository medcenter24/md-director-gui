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

import { UrlHelper } from '../../../../helpers/url.helper';
import { ObjectHelper } from '../../../../helpers/object.helper';
import { RequestField } from './request.field';

export class RequestBuilder {
  constructor (
    public fields: RequestField[] = [],
  ) {
  }

  hasField(name: string): boolean {
    return !!this.getRequestField( name );
  }

  addField(name: string): RequestField {
    const field = new RequestField(name);
    this.fields.push(field);
    return field;
  }

  setValue(name: string = '', value: string = ''): void {
    const activeField = this.getRequestField(name);
    if (!activeField) {
      this.addField(name);
    }
    this.getRequestField(name).setValue( value );
    if (!this.getRequestField(name).isActive()) {
      this.fields = this.fields.filter((rf: RequestField) => rf.getField() !== name);
    }
  }

  getRequestField( name: string): RequestField {
    const res = this.fields.filter((rf: RequestField) => rf.getField() === name);
    return res.length ? res.pop() : null;
  }

  toUrl(): string {
    const parts = [];
    this.fields.forEach((rf: RequestField) => {
      const url = rf.toUrl();
      if (url) {
        parts.push( rf.toUrl() );
      }
    });
    return parts.join('&');
  }

  static fromUrl(url: string): RequestBuilder {
    const builder = new RequestBuilder();
    UrlHelper.getQueryVariables(url).forEach(obj => {
      ObjectHelper.eachProp(obj, key => {
        builder.addField(key);
        builder.setValue(key, obj[key]);
      });
    });
    return builder;
  }
}
