/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
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
  @Output() selected: EventEmitter<City[]> = new EventEmitter<City[]>();

  preloaded: number[] = [];
  isLoaded: boolean = false;
  cities: Array<City> = [];
  city: City[]; // ngModel selected
  filteredCities: Array<City> = [];

  constructor (
    private citiesService: CitiesService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.citiesService.getCities().then(cities => {
      this.cities = cities;
      this.selectPreloadedCities();
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  selectPreloadedCities(): void {
    this.city = [];
    if (this.preloaded && this.preloaded.length) {
      this.city = this.cities.filter((cty: City) => {
        return this.preloaded.indexOf(cty.id) >= 0;
      });
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
    this.preloaded = this.city ? this.city.map(x => x.id) : [];
    this.selected.emit(this.city);
  }

  onBlur(): void {
    if (typeof this.city !== 'object') {
      this.city = null;
    }
    this.onSelect();
  }
}
