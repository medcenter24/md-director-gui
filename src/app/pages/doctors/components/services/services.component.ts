/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { ServicesService } from './services.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ModalComponent } from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./services.scss'],
  templateUrl: './services.html',
})
export class Services {

  @ViewChild('deleteDialog')
    private deleteDialog: ModalComponent;

  @ViewChild('errorDialog')
    private errorDialog: ModalComponent;

  query: string = '';

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
    'delete': {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      title: {
        title: 'Title',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      price: {
        title: 'Price',
        type: 'decimal'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;
  errorMessage: string = '';

  constructor(
      protected service: ServicesService,
      private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit(): void {
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();

    this.service.getServices().then((data) => {
      this.source.load(data);
      this.slimLoadingBarService.complete();
    });
  }

  onTableSave(event): void {
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();

    this.service.update(event.newData).then(() => {
      event.confirm.resolve();
      this.slimLoadingBarService.complete();
    }).catch((reason) => {
      this.slimLoadingBarService.color = '#f89711';
      this.slimLoadingBarService.complete();
      console.log(reason);
      if (event && event.confirm) {
        event.confirm.reject();
      }
      this.showError('Something bad happened, you can\'t save diagnostic')
    });
  }

  onTableCreate(event): void {
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();

    this.service.create(event.newData).then(() => {
      event.confirm.resolve();
      this.slimLoadingBarService.complete();
    }).catch((reason) => {
      this.slimLoadingBarService.color = '#f89711';
      this.slimLoadingBarService.complete();
      if (event && event.confirm) {
        event.confirm.reject();
      }
      this.showError('Something bad happened, you can\'t add diagnostic')
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
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();
    this.service.delete(this.deleteDialogEvent.data.id).then(() => {
      this.deleteDialogEvent.confirm.resolve();
      this.slimLoadingBarService.complete();
      this.deleteDialogEvent = null;
      this.deleteDialog.close();
      this.deleteProcess = false;
    }).catch(() => {
      this.slimLoadingBarService.color = '#f89711';
      this.slimLoadingBarService.complete();
      this.deleteDialogEvent.confirm.reject();
      this.deleteDialogEvent = null;
      this.deleteProcess = false;
    });
  }

  onDeleteDialogCancel(): void {
    if (this.deleteDialogEvent && this.deleteDialogEvent.confirm) {
      this.deleteDialogEvent.confirm.reject();
    }
    this.deleteDialogEvent = null;
  }
}
