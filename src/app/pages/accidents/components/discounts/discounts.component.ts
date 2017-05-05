/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { LocalDataSource } from 'ng2-smart-table';
import { AccidentDiscountsService } from '../../../../components/accident/components/discount/discount.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'basic-table',
  templateUrl: './discounts.html'
})
export class AccidentDiscounts {

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
      description: {
        title: 'Description',
        type: 'string'
      },
      operation: {
        title: 'Operation',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor (protected service: AccidentDiscountsService, private loadingBar: SlimLoadingBarService) {
  }

  ngOnInit (): void {
    this.loadingBar.start();
    this.service.getDiscounts().then((data) => {
      this.source.load(data);
      this.loadingBar.complete();
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of accident discounts', response);
      this.loadingBar.complete();
    });
  }

  onDeleteDialogOk (): void {
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

  onDeleteDialogCancel (): void {
    this.deleteDialogEvent.confirm.reject();
    this.deleteDialogEvent = null;
  }

  onDeleteConfirm (event): void {
    this.deleteDialogEvent = event;
    this.titleForDeletion = event.data.title;
    this.deleteDialog.open('sm');
  }

  onTableSave (event): void {
    this.loadingBar.start();
    this.service.update(event.newData).then(() => {
      event.confirm.resolve();
      this.loadingBar.complete();
    }).catch((reason) => {
      event.confirm.reject();
      this.showError('Something bad happened, you can\'t save accident discounts');
      this.loadingBar.complete();
    });
  }

  onTableCreate (event): void {
    this.loadingBar.start();
    this.service.create(event.newData).then(() => {
      event.confirm.resolve();
      this.loadingBar.complete();
    }).catch((reason) => {
      event.confirm.reject();
      this.showError('Something bad happened, you can\'t add accident discounts');
      this.loadingBar.complete();
    });
  }

  private showError (message: string, response: Response = null): void {
    this.errorMessage = message;
    if (response) {
      this.errorResponse = response;
    }
    this.errorDialog.open('sm');
  }

}
