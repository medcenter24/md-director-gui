/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {Response} from "@angular/http";
import {PatientsService} from "../../../../components/patient/patients.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {Patient} from "../../../../components/patient/patient";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './patients.html',
})
export class Patients {
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
      name: {
        title: 'Name',
        type: 'string'
      },
      address: {
        title: 'Address',
        type: 'string'
      },
      phones: {
        title: 'Phones',
        type: 'string'
      },
      birthday: {
        title: 'Birthday',
        type: 'string'
      },
      comment: {
        title: 'Commentary',
        type: 'string'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('deleteDialog')
  private deleteDialog: ModalComponent;

  @ViewChild('errorDialog')
  private errorDialog: ModalComponent;

  constructor(protected service: PatientsService, private loadingBar: SlimLoadingBarService) { }

  ngOnInit(): void {
    this.loadingBar.start();
    this.service.getPatients().then((data) => {
      this.source.load(data);
      this.loadingBar.complete();
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of patients', response);
      this.loadingBar.complete();
    });
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
    this.titleForDeletion = event.data.name;
    this.deleteDialog.open('sm');
  }

  onTableSave(event): void {
    this.loadingBar.start();
    this.service.update(event.newData).then(() => {
      event.confirm.resolve();
      this.loadingBar.complete();
    }).catch((reason) => {
      event.confirm.reject();
      this.showError('Something bad happened, you can\'t save patients\' data');
      this.loadingBar.complete();
    });
  }

  onTableCreate(event): void {
    this.loadingBar.start();
    this.service.create(event.newData).then((patient: Patient) => {
      event.confirm.resolve(patient);
      this.loadingBar.complete();
    }).catch((reason) => {
      event.confirm.reject();
      this.showError('Something bad happened, you can\'t add patient');
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
