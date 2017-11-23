/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../patient';
import { DateHelper } from '../../../../helpers/date.helper';
import { PatientsService } from '../../patients.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'primeng/primeng';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
    selector: 'nga-patient-editor',
    templateUrl: './editor.html',
})
export class PatientEditorComponent extends LoadableComponent {
    @Input() set initPatient(patientId: number) {
        this.setPatient(patientId);
    }
    @Output() changed: EventEmitter<Patient> = new EventEmitter<Patient>();

    // selected Patient
    patient: Patient;
    birthday: Date;
    maxDate: Date = new Date();
    currentYear: number = +(new Date()).getFullYear();
    msgs: Message[] = [];
    protected componentName: string = 'PatientEditorComponent';

    constructor (
        private dateHelper: DateHelper,
        private patientService: PatientsService,
        private loadingBar: SlimLoadingBarService,
        private _state: GlobalState,
        private translate: TranslateService,
    ) {
        super();
    }

    setPatient (patientId: number): void {
        this.initComponent();
        this.patientService.getPatient(patientId)
            .then((patient: Patient) => {
                this.patient = patient;
                if (this.patient.birthday) {
                    this.birthday = new Date(this.patient.birthday);
                }
                this.loadedComponent();
            })
            .catch( () => {
                this.patient = null;
                this.loadedComponent();
            });
    }

    save(): void {
        this.loadingBar.start();
        this.patient.birthday = this.dateHelper.getUnixDate(this.birthday);
        this.patient.name = this.patient.name.trim();
        let savePromise;
        if (this.patient.id) {
            savePromise = this.patientService.update(this.patient);
        } else {
            savePromise = this.patientService.create(this.patient);
        }
        savePromise.then(() => {
            this.loadingBar.complete();
            this.changed.emit(this.patient);
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: this.translate.instant('Saved'),
                detail: this.translate.instant('Successfully saved') });
            this._state.notifyDataChanged('growl', this.msgs);
        }).catch(() => {
            this.loadingBar.complete();
        });
    }

    changedPatientName(event): void {
        event.target.value = event.target.value.toUpperCase();
        event.target.value = event.target.value.replace(/[^A-Z\s]/g, '');
        event.target.value = event.target.value.replace(/\s+/g, ' ');
        this.patient.name = event.target.value;
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
