/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PatientsService } from '../../patients.service';
import { Patient } from '../../patient';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { SelectPatientComponent } from '../select/select.component';

@Component({
    selector: 'nga-patient-selector',
    templateUrl: 'selector.html',
})
export class PatientSelectorComponent extends LoadableComponent {

    @ViewChild('patientSelect')
        patientSelectComponent: SelectPatientComponent;

    @Output() select: EventEmitter<Patient> = new EventEmitter<Patient>();
    @Input() set initPatient(patientId: number) {
        this.setPatient(patientId);
    }

    protected componentName: string = 'PatientSelectorComponent';

    patient: Patient;

    constructor (
        private patientService: PatientsService,
    ) {
        super();
    }

    resetPatient (patient: Patient): void {
        this.patient = patient;
        this.patientSelectComponent.reloadChosenPatient(patient);
    }

    setPatient (patientId: number): void {
        this.initComponent();
        this.patientService.getPatient(patientId)
            .then((patient: Patient) => {
                this.patient = patient;
                this.loadedComponent();
            })
            .catch( () => {
                this.patient = null;
                this.loadedComponent();
            });
    }

    onPatientChanged(patient: Patient) {
        this.patient = patient;
        this.select.emit(this.patient);
    }
}
