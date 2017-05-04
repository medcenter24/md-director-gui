/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { DoctorsService } from '../../../../components/doctors/doctors.service';
import { DoctorEditorComponent } from '../../../../components/doctors/editor/editor.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,

  templateUrl: './stuff.html',
})
export class Stuff {

  @ViewChild('deleteDialog')
  private deleteDialog: ModalComponent;

  @ViewChild('errorDialog')
  private errorDialog: ModalComponent;

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

  query: string = '';

  settings = {
    actions: {
      position: 'left',
    },
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
      name: {
        title: 'Name',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      ref_key: {
        title: 'Ref. Key',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;
  errorMessage: string = '';

  constructor (protected service: DoctorsService, private loadingBar: SlimLoadingBarService) {
  }

  ngOnInit (): void {
    this.loadingBar.start();
    this.service.getDoctors().then((data) => {
      this.source.load(data);
      this.loadingBar.complete();
    }).catch((error) => {
      this.showError('Something bad happened, you can\'t load list of doctors');
      this.loadingBar.complete();
    });
  }

  onTableSave (event): void {
    this.loadingBar.start();
    this.service.update(event.newData).then(() => {
      event.confirm.resolve();
      this.loadingBar.complete();
    }).catch((reason) => {
      if (event && event.confirm) {
        event.confirm.reject();
      }
      this.showError('Something bad happened, you can\'t save doctors\' data');
      this.loadingBar.complete();
    });
  }

  onTableCreate (event): void {
    this.loadingBar.start();
    this.service.create(event.newData).then(() => {
      event.confirm.resolve();
      this.loadingBar.complete();
    }).catch((reason) => {
      if (event && event.confirm) {
        event.confirm.reject();
      }
      this.showError('Something bad happened, you can\'t create doctor');
      this.loadingBar.complete();
    });
  }

  private showError (message: string): void {
    this.errorMessage = message;
    this.errorDialog.open('sm');
  }

  onDeleteConfirm (event): void {
    this.deleteDialogEvent = event;
    this.titleForDeletion = event.data.name;
    this.deleteDialog.open('sm');
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
    if (this.deleteDialogEvent && this.deleteDialogEvent.confirm) {
      this.deleteDialogEvent.confirm.reject();
    }
    this.deleteDialogEvent = null;
  }

  onUserSelectRow (event): void {
    this.doctorEditorHidden = false;
    this.editableDoctorId = event.data.id;
  }

  onToggleUserEditor (userId: number): void {
    this.userEditorHidden = !this.userEditorHidden;
    this.editableUserId = userId;
  }

  onUserEdited (): void {
    this.doctorEditorComponent.reloadUsers();
  }
}
