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

import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { LoadableComponent } from '../../../../core/components/componentLoader';
import { TranslateService } from '@ngx-translate/core';
import { SelectorConfig } from '../../selector.config';

@Injectable()
export abstract class SelectorAbstractMultiselectComponent extends LoadableComponent implements OnInit {
  langLoaded: boolean = false;
  preloaded: any = [];
  config: SelectorConfig;

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  protected constructor (
    protected translateService: TranslateService,
  ) {
    super();
  }

  /**
   * Get model's data provider
   */
  abstract getService();

  /**
   * Key of the field to show in the selector
   * @returns {string}
   */
  abstract getFieldKey(): string;

  /**
   * Action on data selected
   * @param event
   * @returns {any[]}
   */
  onSelected(event): void {
    return this.selected.emit(event);
  }

  getPlaceholder(): string {
    return '';
  }

  /**
   * Default state for the auto completer
   * If defined then reset should use this value as default for the completer
   * and empty needs to make it blank
   * @returns {Object[] | Object}
   */
  getPreloadedData(): Object[]|Object {
    return this.preloaded;
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.config = SelectorConfig.instance({
        dataProvider: this.getService(),
        labelField: this.getFieldKey(),
        placeholder: this.translateService.instant(this.getPlaceholder()),
      });
    });
  }
}
