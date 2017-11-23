/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { City } from '../../city';
import { CitiesService } from '../../cities.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
@Component({
  selector: 'nga-select-city',
  templateUrl: './select.html',
})
export class CitySelectComponent extends LoadableComponent implements OnInit {

  @Input()
    set selectPreloaded(preloaded: number[]) {
      this.preloaded = preloaded;
      this.selectPreloadedCities();
    }
  @Input() isMultiple: boolean = false;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  preloaded: number[] = [];
  isLoaded: boolean = false;
  cities: City[] = [];
  city: any; // ngModel selected
  filteredCities: City[] = [];
  protected componentName: string = 'CitySelectComponent';

  constructor (
    private citiesService: CitiesService,
    private _logger: Logger) {
    super();
  }

  ngOnInit () {
    this.initComponent();
    this.citiesService.getCities().then(cities => {
      this.cities = cities;
      this.selectPreloadedCities();
      this.isLoaded = true;
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

  selectPreloadedCities(): void {
    this.city = [];
    if (this.preloaded && this.preloaded.length) {
      this.city = this.cities.filter((cty: City) => {
        return this.preloaded.indexOf(cty.id) >= 0;
      });
    }
    if (!this.isMultiple) {
      this.city = this.city.length ? this.city[0] : null;
    }
  }

  filterCities (event): void {
    this.filteredCities = [];
    for (const city of this.cities) {
      if (city.title.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredCities.push(city);
      }
    }
  }

  onSelect (): void {
    if (this.isMultiple) {
      this.preloaded = this.city ? this.city.map(x => x.id) : [];
    }
    this.selected.emit(this.city);
  }

  onBlur(): void {
    if (typeof this.city !== 'object') {
      this.city = null;
    }
    this.onSelect();
  }
}
