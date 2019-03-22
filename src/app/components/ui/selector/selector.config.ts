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


import { Configurable } from '../../core/configurable';
import { SearchableServiceInterface } from '../../core/loadable/searchable.service.interface';
import { SearchFilter } from '../../core/loadable/search.filter';

export class SelectorConfig extends Configurable {

  /**
   * List of fields that required for current configuration
   * @type {string[]}
   */
  protected static required: string[] = ['dataProvider'];

  constructor (
    /**
     * Provider for data searching
     */
    public dataProvider: SearchableServiceInterface,
    /**
     * Name of the label field of an option when an arbitrary objects instead of SelectItems are used as options.
     * @type {string}
     */
    public labelField: string = 'id',
    /**
     * minimum characters that needed for searching
     */
    public minLength: number = 1,
    /**
     * it is parameters to filter results
     */
    public filter: SearchFilter,
    /**
     * placeholder for the empty selector
     */
    public placeholder: string = '',
    /**
     * it is a fields Initialize default state of auto completer
     * @type {any[]}
     */
    public preloaded: any,
  ) {
    super();
  }
}
