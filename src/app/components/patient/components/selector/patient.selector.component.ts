/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
        if (patient) {
            this.setPatient(patient);
        }
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
