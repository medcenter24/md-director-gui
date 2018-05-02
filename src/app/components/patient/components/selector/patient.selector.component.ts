/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PatientsService } from '../../patients.service';
import { Patient } from '../../patient';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { PatientSelectComponent } from '../select/patient.select.component';

@Component({
    selector: 'nga-patient-selector',
    templateUrl: 'patient.selector.html',
    styleUrls: ['patient.selector.scss'],
})
export class PatientSelectorComponent extends LoadableComponent {

    @ViewChild('patientSelect')
        patientSelectComponent: PatientSelectComponent;

    @Output() select: EventEmitter<Patient> = new EventEmitter<Patient>();
    @Input() set initPatient(patient: Patient) {
        this.setPatient(patient);
    }

    protected componentName: string = 'PatientSelectorComponent';

    patient: Patient = new Patient();
    isPhone: boolean = null;

    constructor (
        private patientService: PatientsService,
    ) {
        super();
    }

    resetPatient (patient: Patient): void {
        this.isPhone = null;
        this.patient = patient;
        this.patientSelectComponent.reloadChosenPatient(patient);
    }

    setPatient (patient: Patient): void {
        this.isPhone = null;
        this.patient = patient;
    }

    onPatientChanged(patient: Patient) {
        this.isPhone = null;
        this.patient = patient;
        this.select.emit(this.patient);
    }

    changedValue (event): void {
        if (!this.patient || this.patient.id) {
            this.patient = new Patient();
        }
        if (event.target.value.length === 1) {
            event.target.value = event.target.value.trim();
        }

        this.isPhone = null;
        if (event.target.value.length) {
            const name = this.patientService.formatPatientName(event.target.value);
            if (name.length !== event.target.value.length) {
                this.isPhone = true;

            } else {
                event.target.value = name;
                this.patient.name = name;
                this.isPhone = false;
            }
        }
    }

    getPatient(): Patient {
        return this.patient;
    }
}
