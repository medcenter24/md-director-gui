/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from '../../city';
import { CitiesService } from '../../cities.service';
import { TranslateService } from '@ngx-translate/core';
import { AbstractAutoCompleteController } from '../../../ui/abstract.auto.complete.controller';

@Component({
  selector: 'nga-select-city',
  templateUrl: './city.select.html',
})
export class CitySelectComponent extends AbstractAutoCompleteController {

  protected componentName = 'CitySelectComponent';

  @Input()
    set selectPreloaded(preloaded: City|City[]) {
      // this.selectPreloadedCities(preloaded);
      console.log('select preloaded cities');
    }
  @Input() isMultiple: boolean = false;
  @Output() selected: EventEmitter<City|City[]> = new EventEmitter<City|City[]>();

  constructor (
    private citiesService: CitiesService,
    protected translateService: TranslateService,
    ) {
    super(translateService);
  }

  getService() {
    return this.citiesService;
  }

  getFieldKey(): string {
    return 'title';
  }

  /**
   *
   * @param cities City or City[]
   */
/*  selectPreloadedCities(cities: any): void {
    this.city = [];
    let preloaded = [];

    if (!this.isMultiple && cities instanceof City) {
      preloaded.push(cities.id);
    } else if (this.isMultiple && cities instanceof Array) {
      preloaded = cities.map(x => x.id);
    }
    this.city = this.cities.filter((cty: City) => {
      return preloaded.indexOf(cty.id) >= 0;
    });
    if (!this.isMultiple) {
      this.city = this.city.length ? this.city[0] : null;
    }
  }

  filterCities (event): void {
    this.filteredCities = [];
    for (const city of this.cities) {
      if (city.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredCities.push(city);
      }
    }
  }

  onSelect (): void {
    this.selected.emit(this.city);
  }*/
}
