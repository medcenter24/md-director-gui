/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { AutoCompleteProvider } from './providers/auto.complete.provider';
import { Configurable } from '../../../core/configurable';

export class AutoCompleteSrcConfig extends Configurable {

  constructor (
    /**
     * provider to find data
     * @param {Object} filters
     */
    public dataProvider: Function = function (filters: Object) {},
    /**
     * minimum characters that needed for search
     */
    public minLength: number = 1,
    /**
     * count of loadable rows
     * if 0 then autoCompleter cache data and do not load any more
     * 0 for all data (could be annoying)
     */
    public rows: number = 25,
    /**
     * placeholder for the empty selector
     */
    public placeholder: string = '',
    /**
     * field to use it in selector
     */
    public fieldKey: string = '',
    /**
     * Type of the data provider
     * - static = all data loaded at once to the memory
     * - loadable = request to the server on each action
     * @type {AutoCompleteProvider}
     */
    public provider: string = 'static',
    /**
     * Type of auto suggest
     * could be used as single or multiple choice
     * @type {boolean}
     */
    public isMultiple: boolean = false,
    /**
     * it is initialize default state of auto completer
     * @type {any[]}
     */
    public preloaded: any,
  ) {
    super();
  }
}
