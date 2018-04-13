/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PatientsService } from '../../../../components/patient/patients.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Patient } from '../../../../components/patient/patient';
import { TranslateService } from '@ngx-translate/core';
import { DateHelper } from '../../../../helpers/date.helper';

@Component({
    selector: 'nga-patients',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './patients.html',
})
export class PatientsComponent implements OnInit {

    query: string = '';

    deleteDialogEvent: any = null;
    titleForDeletion: string = '';

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

    constructor(protected service: PatientsService,
                private loadingBar: SlimLoadingBarService,
                private translate: TranslateService,
                private dateHelper: DateHelper,
                ) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });

        this.loadingBar.start();
        this.service.getPatients().then((data) => {
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
                editor: {
                    type: 'textarea',
                },
            },
            address: {
                title: this.translate.instant('Address'),
                type: 'string',
                editor: {
                    type: 'textarea',
                },
            },
            phones: {
                title: this.translate.instant('Phone'),
                type: 'string',
            },
            birthday: {
                title: this.translate.instant('Birthday'),
                type: 'string',
                valuePrepareFunction: (cell) => {
                    let val = cell.toString();
                    if (val.length) {
                        val = this.dateHelper.toEuropeFormat(val);
                    }
                    return val;
                },
            },
            comment: {
                title: this.translate.instant('Commentary'),
                type: 'string',
                editor: {
                    type: 'textarea',
                },
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
/*
    onDeleteDialogOk(): void {
        this.deleteProcess = true;
        this.loadingBar.start();
        this.service.delete(this.deleteDialogEvent.data.id).then(() => {
            this.deleteDialogEvent.confirm.resolve();
            this.deleteDialogEvent = null;
            this.deleteDialog.close();
            this.deleteProcess = false;
            this.loadingBar.complete();
        }).catch(() => {
            this.deleteDialogEvent.confirm.reject();
            this.deleteDialogEvent = null;
            this.deleteProcess = false;
            this.loadingBar.complete();
        });
    }

    onDeleteDialogCancel(): void {
        this.deleteDialogEvent.confirm.reject();
        this.deleteDialogEvent = null;
    }*/

    onDeleteConfirm(event): void {
        this.deleteDialogEvent = event;
        this.titleForDeletion = event.data.name;
        // todo refactor this.deleteDialog.open('sm');
    }

    onTableSave(event): void {
        this.loadingBar.start();
        this.service.update(event.newData).then(() => {
            event.confirm.resolve();
            this.loadingBar.complete();
        }).catch(() => {
            event.confirm.reject();
            this.loadingBar.complete();
        });
    }

    onTableCreate(event): void {
        this.loadingBar.start();
        this.service.create(event.newData).then((patient: Patient) => {
            event.confirm.resolve(patient);
            this.loadingBar.complete();
        }).catch(() => {
            event.confirm.reject();
            this.loadingBar.complete();
        });
    }
}
