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
import { SortRequestField } from '../../../core/http/request/fields';

/**
 * Initialize sortFields with predefined values
 */
export class DatatableSortService {
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

  private getSortRequestBuilder(): RequestBuilder {
    return this.datatableConfig
      .getDatatableRequestBuilder()
      .getSorter();
  }

  private init(): void {
    this.getSortRequestBuilder().getFields().forEach((sortRequestField: SortRequestField) => {
      sortRequestField.setValue(
        UrlHelper.get(
          this.getCurrentUrl(),
          sortRequestField.getField(),
          sortRequestField.getValue(),
        ),
      );
    });
  }
}
