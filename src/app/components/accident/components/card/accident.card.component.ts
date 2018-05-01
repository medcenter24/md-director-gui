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
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-accident-card',
  templateUrl: './accident.card.html',
})
export class AccidentCardComponent extends LoadableComponent implements OnInit {

  @Input() selectedAccidentId: number = 0;
  @Output() closed: EventEmitter<any> = new EventEmitter();

  accident: Accident;
  private patient: Patient;
  protected componentName: string = 'AccidentCardComponent';

  constructor (
    private accidentService: AccidentsService,
    private patientService: PatientsService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    if (+this.selectedAccidentId) {
      const postfix = 'getAccident';
      this.startLoader(postfix);
      this.accidentService.getAccident(this.selectedAccidentId).then(accident => {
        this.stopLoader(postfix);
        this.accident = accident;
        this.loadPatient();
      }).catch((err) => {
        this._logger.error(err);
        this.stopLoader(postfix);
      });
    }
  }

  private loadPatient(): void {
    const opName = 'getPatient';
    this.startLoader(opName);
    this.patientService.getPatient(+this.accident.patient_id).then((patient: Patient) => {
      this.stopLoader(opName);
      this.patient = patient;
    }).catch((err) => {
      this.stopLoader(opName);
      this._logger.error(err);
    });
  }

  closePanel(): void {
    this.accident = null;
    this.patient = null;
    this.closed.emit();
  }
}
