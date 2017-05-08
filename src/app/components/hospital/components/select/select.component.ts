/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { Hospital } from '../../hospital';
import { HospitalsService } from '../../hospitals.service';
@Component({
  selector: 'select-hospital',
  templateUrl: './select.html'
})
export class HospitalSelectComponent {

  @Input() hospitalId: number = 0;

  hospitals: Array<Hospital> = [];
  filteredHospitals: Array<Hospital> = [];

  constructor (private hospitalsService: HospitalsService, private loadingBar: SlimLoadingBarService, private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.hospitalsService.getHospitals().then(hospitals => {
      this.hospitals = hospitals;
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  filterHospitals (event): void {
    this.filteredHospitals = [];
    for(let i = 0; i < this.hospitals.length; i++) {
      let hospital = this.hospitals[i];
      if(hospital.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredHospitals.push(hospital);
      }
    }
  }

  handleDropdownClick() {
    this.filteredHospitals = [];

    //mimic remote call
    setTimeout(() => {
      this.filteredHospitals = this.hospitals;
    }, 100)
  }
}
