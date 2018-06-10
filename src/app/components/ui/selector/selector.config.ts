/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
