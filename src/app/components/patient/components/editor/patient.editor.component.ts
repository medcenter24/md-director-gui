/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../patient';
import { DateHelper } from '../../../../helpers/date.helper';
import { PatientsService } from '../../patients.service';
import { GlobalState } from '../../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'primeng/primeng';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-patient-editor',
  templateUrl: './patient.editor.html',
})
export class PatientEditorComponent extends LoadableComponent {
  @Input() initPatient(patient: Patient) {
    this.setPatient(patient);
  }

  @Output() changed: EventEmitter<Patient> = new EventEmitter<Patient>();

  patient: Patient = new Patient();
  birthday: string = '';
  msgs: Message[] = [];
  protected componentName: string = 'PatientEditorComponent';

  constructor(
    private dateHelper: DateHelper,
    private patientService: PatientsService,
    private _state: GlobalState,
    private translate: TranslateService,
  ) {
    super();
  }

  setPatient(patient: Patient): void {
    this.patient = patient ? patient : new Patient();
    this.birthday = this.patient && this.patient.birthday
      ? this.dateHelper.toEuropeFormatWithTime(this.patient.birthday)
      : null;
  }

  save(): void {
    const postfix = 'Save';
    this.startLoader(postfix);
    if (this.birthday) {
      this.patient.birthday = this.dateHelper
        .getUnixDate(this.dateHelper.parseDateFromFormat(this.birthday, 'd.m.Y'));
    } else {
      this.patient.birthday = '';
    }
    if (this.patient.name && this.patient.name.length) {
      this.patient.name = this.patient.name.trim();
    }
    let savePromise;
    savePromise = this.patient.id ? this.patientService.update(this.patient)
      : this.patientService.create(this.patient);
    savePromise.then((patient) => {
      this.stopLoader(postfix);
      if (patient && patient.id) {
        this.patient = patient;
      }
      this.changed.emit(this.patient);
      this.msgs = [];
      this.msgs.push({
        severity: 'success', summary: this.translate.instant('Saved'),
        detail: this.translate.instant('Successfully saved'),
      });
      this._state.notifyDataChanged('growl', this.msgs);
    }).catch(() => this.stopLoader(postfix));
  }

  changedPatientName(event): void {
    this.patient.name = event.target.value = this.patientService.formatPatientName(event.target.value);
  }

  changedPatientPhone(event): void {
    this.patient.phones = event.target.value;
  }

  changedPatientAddress(event): void {
    this.patient.address = event.target.value;
  }

  changedPatientComment(event): void {
    this.patient.comment = event.target.value;
  }
}
