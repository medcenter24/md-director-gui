/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export interface AutoCompleteProvider {
  /**
   * Filtered models that need to be shown in the selector
   */
  filtered: Object[];

  /**
   * Chosen data
   */
  selected: Object|Object[];

  /**
   * Loading required data with provider from configuration
   * @param event
   */
  loadData(event): Promise<any>;

  /**
   * Called to filtering data
   * @param event
   */
  filter(event): void;

  /**
   * Select defined items in the autocompleter
   * @param {Object | Object[]} items
   */
  selectItems(items: Object|Object[]): void;
}
