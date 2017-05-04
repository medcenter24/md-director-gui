/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
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

    @ViewChild(UserSelectorComponent)
        private userSelectorComponent: UserSelectorComponent;

    constructor (private service: DoctorsService, private loadingBar: SlimLoadingBarService) {};

    ngOnInit(): void {}

    onSubmit(): void {
        this.loadingBar.start();
        if (this.doctor.id) {
            this.service.update(this.doctor).then((doctor: Doctor) => {
                this.loadingBar.complete();
                this.doctorChanged.emit(doctor);
            }).catch(() => {
                this.loadingBar.complete();
            });
        } else {
            this.service.create(this.doctor).then((doctor: Doctor) => {
                this.loadingBar.complete();
                this.doctorChanged.emit(doctor);
            }).catch(() => {
                this.loadingBar.complete();
            });
        }
    }

    onSelectorLoaded(): void {
        this.loadingBar.complete();
    }

    onSelectorLoading(): void {
        this.loadingBar.start();
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
            this.loadingBar.start();
            this.service.getDoctor(id).then((doctor: Doctor) => {
                this.doctor = doctor;
                this.loadingBar.complete();
            }).catch(() => {
                this.loadingBar.complete();
            });
        }
    }
}
