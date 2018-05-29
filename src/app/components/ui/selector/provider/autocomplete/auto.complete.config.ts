/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { SearchableServiceInterface } from '../../../../core/loadable/searchable.service.interface';
import { SearchFilter } from '../../../../core/loadable/search.filter';
import { Configurable } from '../../../../core/configurable';

export class AutoCompleteConfig extends Configurable {

  constructor (
    /**
     * Provider for data searching
     */
    public dataProvider: SearchableServiceInterface,
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
    public preloaded: Object|Object[] = [],
  ) {
    super();
  }
}
