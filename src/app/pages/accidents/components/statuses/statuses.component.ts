/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { Response } from '@angular/http';
import { AccidentStatusesService } from '../../../../components/accident/components/status/statuses.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AccidentStatus } from '../../../../components/accident/components/status/status';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nga-accident-statuses',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './statuses.html',
})
export class AccidentStatusesComponent implements OnInit {

    @ViewChild('deleteDialog')
    private deleteDialog: ModalComponent;

    @ViewChild('errorDialog')
    private errorDialog: ModalComponent;

    query: string = '';

    deleteDialogEvent: any = null;
    titleForDeletion: string = '';
    deleteProcess: boolean = false;
    errorMessage: string = '';
    errorResponse: Response = null;

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

    constructor(protected service: AccidentStatusesService,
                private loadingBar: SlimLoadingBarService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });
        this.loadingBar.start();
        this.service.getStatuses().then((data) => {
            this.source.load(data);
            this.loadingBar.complete();
        }).catch((response) => {
            this.showError('Something bad happened, you can\'t load list of accident statuses', response);
            this.loadingBar.complete();
        });
    }

    loadColumns(): void {
        this.settings.columns = {
            title: {
                title: this.translate.instant('Title'),
                type: 'string',
            },
            type: {
                title: this.translate.instant('Type'),
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
    }

    onDeleteConfirm(event): void {
        this.deleteDialogEvent = event;
        this.titleForDeletion = event.data.title;
        this.deleteDialog.open('sm');
    }

    onTableSave(event): void {
        this.loadingBar.start();
        this.service.update(event.newData).then(() => {
            event.confirm.resolve();
            this.loadingBar.complete();
        }).catch((reason) => {
            event.confirm.reject();
            this.showError('Something bad happened, you can\'t save accident statuses');
            this.loadingBar.complete();
        });
    }

    onTableCreate(event): void {
        this.loadingBar.start();
        this.service.create(event.newData).then((accidentStatus: AccidentStatus) => {
            event.confirm.resolve(accidentStatus);
            this.loadingBar.complete();
        }).catch((reason) => {
            event.confirm.reject();
            this.showError('Something bad happened, you can\'t add accident statuses');
            this.loadingBar.complete();
        });
    }

    private showError(message: string, response: Response = null): void {
        this.errorMessage = message;
        if (response) {
            this.errorResponse = response;
        }
        this.errorDialog.open('sm');
    }
}
