/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {Response} from "@angular/http";
import {AssistantsService} from "../../../../components/assistant/assistant.service";
import {Assistant} from "../../../../components/assistant/assistant";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  templateUrl: './assistants.html',
})
export class Assistants {

  @ViewChild('loadingBarAssistantsList')
    private loadingBar: SlimLoadingBarComponent;

  @ViewChild('deleteDialog')
    private deleteDialog: ModalComponent;

  @ViewChild('errorDialog')
    private errorDialog: ModalComponent;

  query: string = '';

  currentAssistant: Assistant = null;
  isAssistant: boolean = false;

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;
  errorMessage: string = '';
  errorResponse: Response = null;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      title: {
        title: 'Title',
        type: 'string'
      },
      email: {
        title: 'E-Mail',
        type: 'string'
      },
      comment: {
        title: 'Commentary',
        type: 'string'
      },
      ref_key: {
        title: 'Ref. Key',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: AssistantsService) { }

  ngOnInit(): void {
    this.startLoading();
    this.service.getAssistants().then((data) => {
      this.source.load(data);
      this.completeLoading()
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of accident types', response);
      this.errorLoading();
    });
  }

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

  onDeleteDialogOk(): void {
    this.deleteProcess = true;
    this.startLoading();
    this.service.delete(this.deleteDialogEvent.data.id).then(() => {
      this.deleteDialogEvent.confirm.resolve();
      this.deleteDialogEvent = null;
      this.deleteDialog.close();
      this.deleteProcess = false;
      this.isAssistant = false;
      this.completeLoading();
    }).catch(() => {
      this.errorLoading();
      this.deleteDialogEvent.confirm.reject();
      this.deleteDialogEvent = null;
      this.deleteProcess = false;
      this.completeLoading();
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
    this.startLoading();
    this.service.update(event.newData).then(() => {
      event.confirm.resolve();
      this.completeLoading();
    }).catch((reason) => {
      this.errorLoading();
      event.confirm.reject();
      this.showError('Something bad happened, you can\'t save accident checkpoint');
      this.completeLoading();
    });
  }

  onTableCreate(event): void {
    this.startLoading();
    this.service.create(event.newData).then(() => {
      event.confirm.resolve();
      this.completeLoading();
    }).catch((reason) => {
      this.errorLoading();
      event.confirm.reject();
      this.showError('Something bad happened, you can\'t add accident checkpoint');
      this.completeLoading();
    });
  }

  private showError(message: string, response: Response = null): void {
    this.errorMessage = message;
    if (response) {
      this.errorResponse = response;
    }
    this.errorDialog.open('sm');
  }

  onUserSelectRow(event): void {
    this.isAssistant = true;
    this.currentAssistant = event.data;
  }

  onUpdateAssistant(assistant: Assistant): void {
    this.source.update(this.currentAssistant, assistant);
  }
}
