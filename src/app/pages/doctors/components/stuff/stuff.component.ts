/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DoctorsService } from '../../../../components/doctors/doctors.service';
import { DoctorEditorComponent } from '../../../../components/doctors/editor/doctor.editor.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { City } from '../../../../components/city/city';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nga-stuff-component',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './stuff.html',
})
export class StuffComponent implements OnInit {

    @ViewChild(DoctorEditorComponent)
    private doctorEditorComponent: DoctorEditorComponent;

    /**
     * User editor
     * @type {boolean}
     */
    userEditorHidden: boolean = true;
    editableUserId: number = 0;

    /**
     * Doctor editor
     * @type {boolean}
     */
    doctorEditorHidden: boolean = true;
    editableDoctorId: number = 0;

    /**
     * Cities selector
     * @type {boolean}
     */
    selectedCities: City[] = [];

    query: string = '';

    settings = {
        actions: null,
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline"></i>',
            createButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true,
        },
        'delete': {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true,
        },
        columns: null,
        noDataMessage: 'No data found',
    };

    source: LocalDataSource = new LocalDataSource();

    deleteDialogEvent: any = null;
    titleForDeletion: string = '';
    deleteProcess: boolean = false;

    constructor(protected service: DoctorsService,
                private loadingBar: SlimLoadingBarService,
                private _logger: Logger,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });
        this.loadingBar.start();
        this.service.getDoctors().then((data) => {
            this.source.load(data);
            this.loadingBar.complete();
        }).catch(() => {
            this.loadingBar.complete();
        });
    }

    loadColumns(): void {
        this.settings.columns = {
            name: {
                title: this.translate.instant('Name'),
                type: 'string',
            },
            description: {
                title: this.translate.instant('Description'),
                type: 'string',
            },
            ref_key: {
                title: this.translate.instant('Ref. Key'),
                type: 'string',
            },
        };
        this.settings.actions = {
            columnTitle: this.translate.instant('Action'),
            edit: true,
            add: true,
            'delete': true,
            position: 'left',
        };
        this.settings.noDataMessage = this.translate.instant('No data found');
    }

    handleTableSave(event): void {
        this.loadingBar.start();
        this.service.update(event.newData).then(() => {
            event.confirm.resolve();
            this.doctorEditorHidden = true;
            this.userEditorHidden = true;
            this.loadingBar.complete();
        }).catch((reason) => {
            if (event && event.confirm) {
                event.confirm.reject();
            }
            this.loadingBar.complete();
            this._logger.error(reason);
        });
    }

    handleTableCreate(event): void {
        this.loadingBar.start();
        this.service.create(event.newData).then(response => {
            event.confirm.resolve(response);
            this.doctorEditorHidden = true;
            this.userEditorHidden = true;
            this.loadingBar.complete();
        }).catch(() => {
            if (event && event.confirm) {
                event.confirm.reject();
            }
            this.loadingBar.complete();
        });
    }

    handleDeleteConfirm(event): void {
        this.deleteDialogEvent = event;
        this.titleForDeletion = event.data.name;
        // todo refactoring this.deleteDialog.open('sm');
    }
/*

    clickDeleteDialogOk(): void {
        this.deleteProcess = true;
        this.loadingBar.start();
        this.service.delete(this.deleteDialogEvent.data.id).then(() => {
            this.deleteDialogEvent.confirm.resolve();
            this.deleteDialogEvent = null;
            this.deleteDialog.close();
            this.deleteProcess = false;
            this.doctorEditorHidden = true;
            this.userEditorHidden = true;
            this.loadingBar.complete();
        }).catch(() => {
            this.deleteDialogEvent.confirm.reject();
            this.deleteDialogEvent = null;
            this.deleteProcess = false;
            this.doctorEditorHidden = true;
            this.userEditorHidden = true;
            this.loadingBar.complete();
        });
    }

    handleDeleteDialogCancel(): void {
        if (this.deleteDialogEvent && this.deleteDialogEvent.confirm) {
            this.deleteDialogEvent.confirm.reject();
        }
        this.deleteDialogEvent = null;
    }
*/

    closeDoctorEditor(): void {
        this.doctorEditorHidden = true;
        this.userEditorHidden = true;
        this.editableDoctorId = null;
        this.editableUserId = null;
    }

    handleUserSelectRow(event): void {
        this.doctorEditorHidden = false;
        this.userEditorHidden = true;
        this.editableDoctorId = event.data.id;
    }

    handleToggleUserEditor(userId: number): void {
        this.userEditorHidden = !this.userEditorHidden;
        this.editableUserId = +userId;
    }

    handleUserEdited(): void {
        this.doctorEditorComponent.reloadUsers();
    }
}
