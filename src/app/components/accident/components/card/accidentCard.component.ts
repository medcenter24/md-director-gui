/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { Accident } from '../../accident';
import { AccidentsService } from '../../accidents.service';
import { PatientsService } from '../../../patient/patients.service';
import { Patient } from '../../../patient/patient';

@Component({
  selector: 'accident-card',
  templateUrl: './accidentCard.html'
})
export class AccidentCardComponent {

  @Input() selectedAccidentId: number = 0;
  @Output() closed: EventEmitter<any> = new EventEmitter();

  public accident: Accident;
  private patient: Patient;

  constructor (
    private accidentService: AccidentsService,
    private patientService: PatientsService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) { }

  ngOnInit () {
    this.loadingBar.start();
    this.accidentService.getAccident(this.selectedAccidentId).then(accident => {
      this.accident = accident;
      this.loadPatient();
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  private loadPatient(): void {
    this.loadingBar.start();
    this.patientService.getPatient(this.accident.patient_id).then((patient: Patient) => {
      this.patient = patient;
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  closePanel(): void {
    this.accident = null;
    this.patient = null;

    this.closed.emit();
  }
}
