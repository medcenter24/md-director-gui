/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Logger } from 'angular2-logger/core';
import { Patient } from '../../patient';
import { PatientsService } from '../../patients.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-select-patient',
  templateUrl: './patient.select.html',
})
export class PatientSelectComponent extends LoadableComponent implements OnInit {

  @Output() select: EventEmitter<Patient> = new EventEmitter<Patient>();
  @Input() patient: Patient;

  protected componentName: string = 'SelectPatientComponent';

  isLoaded: boolean = false;
  dataPatients: SelectItem[] = [];
  selectedPatient: Patient;
  patients: Patient[] = [];

  filteredPatients: Patient[] = [];

  constructor (
    private patientService: PatientsService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.reload();
  }

  onChanged(event): void {
    const patients = this.patients.filter((patient: Patient) => {
      return event.value.indexOf(`${patient.id}`) !== -1;
    });

    this.select.emit(patients[0]);
  }

  reloadChosenPatient(patient: Patient): void {
    if (patient && patient.id) {
      const filtered = this.patients.filter((val: Patient) => {
        return val.id === patient.id;
      });

      if (!filtered.length) {
          this.patients.push(patient);
      }
      this.selectedPatient = patient ? patient : null;
    }
    this.patient = patient;
 }

  reload(): void {
      this.initComponent();
      this.patientService.getPatients().then(patients => {
          this.patients = patients;
          this.dataPatients = patients.map(x => {
              return {
                  label: `${x.name}`,
                  value: `${x.id}`,
              };
          });
          this.isLoaded = true;
          this.loadedComponent();
      }).catch((err) => {
          this._logger.error(err);
          this.loadedComponent();
      });
    }

  filterPatients (event): void {
    this.filteredPatients = [];
    for (const patient of this.patients) {
      if (patient.name && patient.name.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredPatients.push(patient);
      } else if (patient.phones && patient.phones.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredPatients.push(patient);
      }
    }
  }

  onSelect(event: Patient): void {
      this.patient = event;
      this.select.emit(event);
  }
}
