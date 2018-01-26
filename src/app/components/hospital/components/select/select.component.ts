/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Hospital } from '../../hospital';
import { HospitalsService } from '../../hospitals.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
@Component({
  selector: 'nga-select-hospital',
  templateUrl: './select.html',
})
export class HospitalSelectComponent extends LoadableComponent implements OnInit {

  @Input() hospitalId: number = 0;

  hospitals: Hospital[] = [];
  hospital: Hospital;
  filteredHospitals: Hospital[] = [];
  protected componentName: string = 'HospitalSelectComponent';

  constructor (
    private hospitalsService: HospitalsService,
    private _logger: Logger) {
    super();
  }

  ngOnInit () {
    this.initComponent();
    this.hospitalsService.getHospitals().then(hospitals => {
      this.hospitals = hospitals;
      if (this.hospitalId) {
        this.hospital = this.hospitals.find(hospital => hospital.id === this.hospitalId);
      }
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

  filterHospitals (event): void {
    this.filteredHospitals = [];
    for (const hospital of this.hospitals) {
      if (hospital.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
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
