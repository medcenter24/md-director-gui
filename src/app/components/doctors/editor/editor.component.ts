/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import {SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {Doctor} from "../doctor";
import {DoctorsService} from "../doctors.service";
import {UserSelectorComponent} from "../../users/selector/selector.component";

@Component({
    selector: 'doctor-editor',
    templateUrl: './editor.html',
})
export class DoctorEditorComponent {

    doctor: Doctor = new Doctor();
    showUserEditor: boolean = false;

    @Input()
        set doctorId(id: number) {
            this.loadDoctor(id);
        }

    @Output() doctorChanged: EventEmitter<Doctor> = new EventEmitter<Doctor>();
    @Output() toggleUserEditor: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('loadingBarDoctorEditor')
        private loadingBar: SlimLoadingBarComponent;

    @ViewChild(UserSelectorComponent)
        private userSelectorComponent: UserSelectorComponent;

    constructor (private service: DoctorsService) {};

    ngOnInit(): void {}

    startLoading(): void {
        this.loadingBar.color = '#209e91';
        this.loadingBar.show = true;
        this.loadingBar.service.reset();
        this.loadingBar.service.start();
    }

    completeLoading(): void {
        this.loadingBar.service.complete();
        this.loadingBar.show = false;
    }

    errorLoading(): void {
        this.loadingBar.color = '#f89711';
    }

    onSubmit(): void {
        this.startLoading();

        if (this.doctor.id) {
            this.service.update(this.doctor).then((doctor: Doctor) => {
                this.completeLoading();
                this.doctorChanged.emit(doctor);
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        } else {
            this.service.create(this.doctor).then((doctor: Doctor) => {
                this.completeLoading();
                this.doctorChanged.emit(doctor);
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        }
    }

    onSelectorLoaded(): void {
        this.completeLoading();
    }

    onSelectorLoading(): void {
        this.startLoading();
    }

    onUserChanged(userId: number): void {
        this.doctor.user_id = userId;
    }

    toggleEditor(userId: number): void {
        this.showUserEditor = !this.showUserEditor;
        this.toggleUserEditor.emit(userId);
    }

    reloadUsers(): void {
        this.userSelectorComponent.reloadWithUserId(this.doctor.user_id);
    }

    private loadDoctor(id: number): void {
        if (id) {
            this.startLoading();
            this.service.getDoctor(id).then((doctor: Doctor) => {
                this.doctor = doctor;
                this.completeLoading();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        }
    }
}
