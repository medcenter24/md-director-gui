/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SurveyService } from '../../../../components/survey/survey.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component ({
    selector: 'nga-surveys',
    templateUrl: 'survey.html',
})
export class SurveysComponent implements OnInit {

    @ViewChild('deleteDialog')
        private deleteDialog: ModalComponent;

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
        protected service: SurveyService,
        private loadingBar: SlimLoadingBarService,
        private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });
        this.loadingBar.start();
        this.service.getSurveys().then((data) => {
            this.source.load(data);
            this.loadingBar.complete();
        }).catch((error) => {
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
        }).catch(() => {
            event.confirm.reject();
            this.loadingBar.complete();
        });
    }

    onTableCreate(event): void {
        this.loadingBar.start();
        this.service.create(event.newData).then(() => {
            event.confirm.resolve();
            this.loadingBar.complete();
        }).catch(() => {
            if (event && event.confirm) {
                event.confirm.reject();
            }
            this.loadingBar.complete();
        });
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
