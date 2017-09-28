/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Accident } from '../../accident';
import { AccidentsService } from '../../accidents.service';
import { PatientsService } from '../../../patient/patients.service';
import { Patient } from '../../../patient/patient';

@Component({
  selector: 'nga-accident-card',
  templateUrl: './accidentCard.html',
})
export class AccidentCardComponent implements OnInit {

  @Input() selectedAccidentId: number = 0;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  accident: Accident;
  private patient: Patient;

  constructor (
    private accidentService: AccidentsService,
    private patientService: PatientsService,
    private _logger: Logger,
  ) { }

  ngOnInit () {
    if (+this.selectedAccidentId) {
      this.init.emit('AccidentCardComponent.getAccident');
      this.accidentService.getAccident(this.selectedAccidentId).then(accident => {
        this.loaded.emit('AccidentCardComponent.getAccident');
        this.accident = accident;
        this.loadPatient();
      }).catch((err) => {
        this._logger.error(err);
        this.loaded.emit('AccidentCardComponent.getAccident');
      });
    }
  }

  private loadPatient(): void {
    this.init.emit('AccidentCardComponent.getPatient');
    this.patientService.getPatient(+this.accident.patient_id).then((patient: Patient) => {
      this.patient = patient;
      this.loaded.emit('AccidentCardComponent.getPatient');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('AccidentCardComponent.getPatient');
    });
  }

  closePanel(): void {
    this.accident = null;
    this.patient = null;
    this.closed.emit();
  }
}
