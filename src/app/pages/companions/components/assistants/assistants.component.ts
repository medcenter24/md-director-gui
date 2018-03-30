/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Assistant } from '../../../../components/assistant/assistant';
import { AssistantsService } from '../../../../components/assistant/assistant.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nga-assistants',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './assistants.html',
})
export class AssistantsComponent implements OnInit {

    query: string = '';

    currentAssistant: Assistant = null;
    isAssistant: boolean = false;

    deleteDialogEvent: any = null;
    titleForDeletion: string = '';
    deleteProcess: boolean = false;

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

    constructor(protected service: AssistantsService,
                private loadingBar: SlimLoadingBarService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });

        this.loadingBar.start();
        this.service.getAssistants().then((data: Assistant[]) => {
            this.source.load(data);
            this.loadingBar.complete();
        }).catch(() => {
            this.loadingBar.complete();
        });
    }

    loadColumns(): void {
        this.settings.columns = {
            title: {
                title: this.translate.instant('Title'),
                type: 'string',
                editor: {
                    type: 'textarea',
                },
            },
            email: {
                title: this.translate.instant('E-Mail'),
                type: 'string',
            },
            comment: {
                title: this.translate.instant('Commentary'),
                type: 'string',
                editor: {
                    type: 'textarea',
                },
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
/*
    onDeleteDialogOk(): void {
        this.deleteProcess = true;
        this.loadingBar.start();
        this.service.delete(this.deleteDialogEvent.data.id).then(() => {
            this.deleteDialogEvent.confirm.resolve();
            this.deleteDialogEvent = null;
            this.deleteDialog.close();
            this.deleteProcess = false;
            this.isAssistant = false;
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
        this.titleForDeletion = event.data.title;
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
        this.service.create(event.newData).then((assistant: Assistant) => {
            event.confirm.resolve(assistant);
            this.loadingBar.complete();
        }).catch(() => {
            event.confirm.reject();
            this.loadingBar.complete();
        });
    }

    onUserSelectRow(event): void {
        this.isAssistant = true;
        this.currentAssistant = event.data;
    }

    onUpdateAssistant(assistant: Assistant): void {
        this.source.update(this.currentAssistant, assistant);
    }

    closeAssistantEditor(): void {
        this.isAssistant = false;
        this.currentAssistant = null;
    }
}
