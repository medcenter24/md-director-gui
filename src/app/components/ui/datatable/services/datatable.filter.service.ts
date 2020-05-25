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

import { DatatableConfig } from '../entities';
import { Location } from '@angular/common';
import { UrlHelper } from '../../../../helpers/url.helper';
import { RequestBuilder } from '../../../core/http/request';
import { FilterRequestField } from '../../../core/http/request/fields';

/**
 * Initialize filterFields with predefined values
 */
export class DatatableFilterService {
  private datatableConfig: DatatableConfig;
  private location: Location;

  constructor (
    datatableConfig: DatatableConfig,
    location: Location,
  ) {
    this.datatableConfig = datatableConfig;
    this.location = location;
    this.init();
  }

  private getCurrentUrl(): string {
    return this.location.path(true);
  }

  private getFilterRequestBuilder(): RequestBuilder {
    return this.datatableConfig
      .getDatatableRequestBuilder()
      .getFilter();
  }

  private init(): void {
    this.getFilterRequestBuilder().getFields().forEach((filterRequestField: FilterRequestField) => {
      filterRequestField.setValue(
        UrlHelper.get(
          this.getCurrentUrl(),
          filterRequestField.getField(),
          filterRequestField.getValue(),
        ),
      );
    });
  }
}
