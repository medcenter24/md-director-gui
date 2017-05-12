/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { City } from '../../city';
import { CitiesService } from '../../cities.service';
@Component({
  selector: 'select-city',
  templateUrl: './select.html'
})
export class CitySelectComponent {

  @Input() cityId: number = 0;

  cities: Array<City> = [];
  city: City;
  filteredCities: Array<City> = [];

  constructor (private citiesService: CitiesService, private loadingBar: SlimLoadingBarService, private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.citiesService.getCities().then(cities => {
      this.cities = cities;
      if (this.cityId) {
        this.city = this.cities.find(city => city.id === this.cityId);
      }
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  filterCities (event): void {
    this.filteredCities = [];
    for(let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      if(city.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredCities.push(city);
      }
    }
  }

  handleDropdownClick() {
    this.filteredCities = [];

    //mimic remote call
    setTimeout(() => {
      this.filteredCities = this.cities;
    }, 100)
  }
}
