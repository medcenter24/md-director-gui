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

import { Location } from '@angular/common';
import { RequestBuilder, RequestField } from '../../../core/http/request';
import { UrlHelper } from '../../../../helpers/url.helper';
import { PaginationLimitRequestField, PaginationOffsetRequestField } from '../../../core/http/request/fields';
import { DatatableConfig } from '../entities';

/**
 * Controller for the PaginationRequestFields state
 */
export class DatatablePaginationService {

  private datatableConfig: DatatableConfig;
  private location: Location;
  private limit: number = 0;
  private offset: number = 0;

  constructor (
    datatableConfig: DatatableConfig,
    location: Location,
  ) {
    this.datatableConfig = datatableConfig;
    this.location = location;
    this.init();
  }

  /**
   * Initialize paginator from the income parameters and URL
   */
  private init(): void {
    this.limit = +UrlHelper.get(
      this.getCurrentUrl(),
      this.getLimitRequestField().getField(),
      this.getLimitRequestField().getValue(),
    );
    this.offset = +UrlHelper.get(
      this.getCurrentUrl(),
      this.getOffsetRequestField().getField(),
      this.getOffsetRequestField().getValue(),
    );

    // update request fields if was updated by url
    this.getLimitRequestField().setValue(`${this.limit}`);
    this.getOffsetRequestField().setValue(`${this.offset}`);
  }

  private getPaginationRequestBuilder(): RequestBuilder {
    return this.datatableConfig.getDatatableRequestBuilder().getPaginator();
  }

  private getLimitRequestField(): RequestField {
    return this.getPaginationRequestBuilder().getRequestField(PaginationLimitRequestField.FIELD_NAME);
  }

  private getOffsetRequestField(): RequestField {
    return this.getPaginationRequestBuilder().getRequestField(PaginationOffsetRequestField.FIELD_NAME);
  }

  private getCurrentUrl(): string {
    return this.location.path(true);
  }

  changePage(event): void {
    this.getOffsetRequestField().setValue(`${event.first}`);
    this.getLimitRequestField().setValue(`${event.rows}`);
  }

  getLimit(): number {
    return this.limit;
  }
}
