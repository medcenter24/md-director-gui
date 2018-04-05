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
      this.onInit(`${this.componentName}.getAccident`);
      this.accidentService.getAccident(this.selectedAccidentId).then(accident => {
        this.onLoaded(`${this.componentName}.getAccident`);
        this.accident = accident;
        this.loadPatient();
      }).catch((err) => {
        this._logger.error(err);
        this.onLoaded(`${this.componentName}.getAccident`);
      });
    }
  }

  private loadPatient(): void {
    this.onInit(`${this.componentName}.getPatient`);
    this.patientService.getPatient(+this.accident.patient_id).then((patient: Patient) => {
      this.patient = patient;
      this.onLoaded(`${this.componentName}.getPatient`);
    }).catch((err) => {
      this._logger.error(err);
      this.onLoaded(`${this.componentName}.getPatient`);
    });
  }

  closePanel(): void {
    this.accident = null;
    this.patient = null;
    this.closed.emit();
  }
}
