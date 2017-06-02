/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { Doctor } from '../doctor';
import { DoctorsService } from '../doctors.service';
@Component({
  selector: 'select-doctor',
  templateUrl: './select.html'
})
export class DoctorSelectComponent {

  @Input() doctorId: number = 0;

  doctors: Array<Doctor> = [];
  doctor: Doctor;
  filteredDoctors: Array<Doctor> = [];

  constructor (private doctorsService: DoctorsService, private loadingBar: SlimLoadingBarService, private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.doctorsService.getDoctors().then(doctors => {
      this.doctors = doctors;
      if (this.doctorId) {
        this.doctorId *= 1;
        this.doctor = this.doctors.find(doc => doc.id === this.doctorId);
      }
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  filterDoctors (event): void {
    this.filteredDoctors = [];
    for(let i = 0; i < this.doctors.length; i++) {
      let doctor = this.doctors[i];
      if(doctor.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredDoctors.push(doctor);
      }
    }
  }

  handleDropdownClick() {
    this.filteredDoctors = [];

    //mimic remote call
    setTimeout(() => {
      this.filteredDoctors = this.doctors;
    }, 100)
  }
}
