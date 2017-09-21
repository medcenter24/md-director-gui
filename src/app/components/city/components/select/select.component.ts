/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { City } from '../../city';
import { CitiesService } from '../../cities.service';
@Component({
  selector: 'nga-select-city',
  templateUrl: './select.html',
})
export class CitySelectComponent implements OnInit {

  @Input()
    set selectPreloaded(preloaded: number[]) {
      this.preloaded = preloaded;
      this.selectPreloadedCities();
    }
  @Input() isMultiple: boolean = false;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  preloaded: number[] = [];
  isLoaded: boolean = false;
  cities: Array<City> = [];
  city: any; // ngModel selected
  filteredCities: Array<City> = [];

  constructor (
    private citiesService: CitiesService,
    private _logger: Logger) {}

  ngOnInit () {
    this.init.emit('CitySelectComponent');
    this.citiesService.getCities().then(cities => {
      this.cities = cities;
      this.selectPreloadedCities();
      this.isLoaded = true;
      this.loaded.emit('CitySelectComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('CitySelectComponent');
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
    for (let i = 0; i < this.cities.length; i++) {
      const city = this.cities[i];
      if (city.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredCities.push(city);
      }
    }
  }

  handleDropdownClick() {
    this.filteredCities = [];

    // mimic remote call
    setTimeout(() => {
      this.filteredCities = this.cities;
    }, 100);
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
