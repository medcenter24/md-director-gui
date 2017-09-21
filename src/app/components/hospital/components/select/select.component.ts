/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Hospital } from '../../hospital';
import { HospitalsService } from '../../hospitals.service';
@Component({
  selector: 'nga-select-hospital',
  templateUrl: './select.html',
})
export class HospitalSelectComponent implements OnInit {

  @Input() hospitalId: number = 0;
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  hospitals: Array<Hospital> = [];
  hospital: Hospital;
  filteredHospitals: Array<Hospital> = [];

  constructor (
    private hospitalsService: HospitalsService,
    private _logger: Logger) {}

  ngOnInit () {
    this.init.emit('HospitalSelectComponent');
    this.hospitalsService.getHospitals().then(hospitals => {
      this.hospitals = hospitals;
      if (this.hospitalId) {
        this.hospital = this.hospitals.find(hospital => hospital.id === this.hospitalId);
      }
      this.loaded.emit('HospitalSelectComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('HospitalSelectComponent');
    });
  }

  filterHospitals (event): void {
    this.filteredHospitals = [];
    for (let i = 0; i < this.hospitals.length; i++) {
      const hospital = this.hospitals[i];
      if (hospital.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredHospitals.push(hospital);
      }
    }
  }

  handleDropdownClick(event) {
    this.filteredHospitals = [];

    setTimeout(() => {
      this.filteredHospitals = this.hospitals;
    }, 100);
  }
}
