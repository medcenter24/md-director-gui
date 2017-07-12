/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { Doctor } from '../doctor';
import { DoctorsService } from '../doctors.service';
@Component({
  selector: 'nga-select-doctor',
  templateUrl: './select.html',
})
export class DoctorSelectComponent implements OnInit {

  @Input() set doctorId(docId: number) {
    this.docId = +docId;
    this.selectDoctor();
  }
  @Output() selected: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  docId: number = 0;
  doctors: Array<Doctor> = [];
  doctor: Doctor;
  filteredDoctors: Array<Doctor> = [];
  isLoaded: boolean = false;

  constructor (
    private doctorsService: DoctorsService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.isLoaded = false;
    this.doctorsService.getDoctors().then(doctors => {
      this.doctors = doctors;
      this.selectDoctor();
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  private selectDoctor(): void {
    if (this.docId) {
      this.doctor = this.doctors.find(doc => doc.id === +this.docId);
    }
  }

  filterDoctors (event): void {
    this.filteredDoctors = [];
    for (let i = 0; i < this.doctors.length; i++) {
      const doctor = this.doctors[i];
      if (doctor.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredDoctors.push(doctor);
      }
    }
  }

  handleDropdownClick() {
    this.filteredDoctors = [];

    setTimeout(() => {
      this.filteredDoctors = this.doctors;
    }, 100);
  }

  onSelect (): void {
    this.docId = this.doctor ? this.doctor.id : 0;
    this.selected.emit(this.doctor);
  }

  onBlur(): void {
    if (typeof this.doctor !== 'object') {
      this.doctor = null;
    }
    this.onSelect();
  }
}
