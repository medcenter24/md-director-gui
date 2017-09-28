/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { ServicesService } from '../../../../components/service/services.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nga-doctor-service',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './services.html',
})
export class DoctorServicesComponent implements OnInit {

    @ViewChild('deleteDialog')
    private deleteDialog: ModalComponent;

    @ViewChild('errorDialog')
    private errorDialog: ModalComponent;

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
    errorMessage: string = '';

    constructor(
        protected service: ServicesService,
        private loadingBar: SlimLoadingBarService,
        private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });
        this.loadingBar.start();
        this.service.getServices().then((data) => {
            this.source.load(data);
            this.loadingBar.complete();
        }).catch((error) => {
            this.showError('Something bad happened, you can\'t load list of services');
            this.loadingBar.complete();
        });
    }

    loadColumns(): void {
        this.settings.columns = {
            title: {
                title: this.translate.instant('Title'),
                type: 'string',
            },
            description: {
                title: this.translate.instant('Description'),
                type: 'string',
            },
            price: {
                title: this.translate.instant('Price'),
                type: 'decimal',
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

    onTableSave(event): void {
        this.loadingBar.start();
        this.service.update(event.newData).then(() => {
            event.confirm.resolve();
            this.loadingBar.complete();
        }).catch((reason) => {
            event.confirm.reject();
            this.showError('Something bad happened, you can\'t save service');
            this.loadingBar.complete();
        });
    }

    onTableCreate(event): void {
        this.loadingBar.start();
        this.service.create(event.newData).then(() => {
            event.confirm.resolve();
            this.loadingBar.complete();
        }).catch((reason) => {
            if (event && event.confirm) {
                event.confirm.reject();
            }
            this.showError('Something bad happened, you can\'t create service');
            this.loadingBar.complete();
        });
    }

    private showError(message: string): void {
        this.errorMessage = message;
        this.errorDialog.open('sm');
    }

    onDeleteConfirm(event): void {
        this.deleteDialogEvent = event;
        this.titleForDeletion = event.data.title;
        this.deleteDialog.open('sm');
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
        if (this.deleteDialogEvent && this.deleteDialogEvent.confirm) {
            this.deleteDialogEvent.confirm.reject();
        }
        this.deleteDialogEvent = null;
    }
}
