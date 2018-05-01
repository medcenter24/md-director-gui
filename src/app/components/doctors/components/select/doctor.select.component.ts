/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from '../../doctor';
import { DoctorsService } from '../../doctors.service';
import { LoadableComponent } from '../../../core/components/componentLoader';

@Component({
  selector: 'nga-select-doctor',
  templateUrl: './doctor.select.html',
})
export class DoctorSelectComponent extends LoadableComponent implements OnInit {

  @Input() set doctorId(docId: number) {
    this.docId = +docId;
    this.selectDoctor();
  }
  @Output() selected: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  docId: number = 0;
  doctors: Doctor[] = [];
  doctor: Doctor;
  filteredDoctors: Doctor[] = [];
  isLoaded: boolean = false;
  protected componentName: string = 'DoctorSelectComponent';

  constructor (private doctorsService: DoctorsService) {
    super();
  }

  ngOnInit () {
    this.startLoader();
    this.isLoaded = false;
    this.doctorsService.getDoctors().then(doctors => {
      this.stopLoader();
      this.doctors = doctors;
      this.selectDoctor();
      this.isLoaded = true;
    }).catch(() => this.stopLoader());
  }

  private selectDoctor(): void {
    if (this.docId) {
      this.doctor = this.doctors.find(doc => doc.id === +this.docId);
    }
  }

  filterDoctors (event): void {
    this.filteredDoctors = [];
    for (const doctor of this.doctors) {
      if (doctor.name.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredDoctors.push(doctor);
      }
    }
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
