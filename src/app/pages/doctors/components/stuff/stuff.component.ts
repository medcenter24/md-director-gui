/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import {SlimLoadingBarService, SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {DoctorsService} from "../../../../components/doctors/doctors.service";
import {DoctorEditorComponent} from "../../../../components/doctors/editor/editor.component";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  templateUrl: './stuff.html',
})
export class Stuff {

  @ViewChild('loadingBarStuffList')
    private loadingBar: SlimLoadingBarComponent;

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

  constructor(protected service: DoctorsService) {}

  ngOnInit(): void {
    this.startLoading();
    this.service.getDoctors().then((data) => {
      this.source.load(data);
      this.completeLoading()
    }).catch(function (error) {
      this.showError('Something bad happened, you can\'t load list of doctors');
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

  onTableSave(event): void {
    this.startLoading();
    this.service.update(event.newData).then(() => {
      event.confirm.resolve();
      this.completeLoading();
    }).catch((reason) => {
      this.errorLoading();
      if (event && event.confirm) {
        event.confirm.reject();
      }
      this.showError('Something bad happened, you can\'t save doctors\' data');
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
      if (event && event.confirm) {
        event.confirm.reject();
      }
      this.showError('Something bad happened, you can\'t create doctor');
      this.completeLoading();
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
    this.startLoading();
    this.service.delete(this.deleteDialogEvent.data.id).then(() => {
      this.deleteDialogEvent.confirm.resolve();
      this.deleteDialogEvent = null;
      this.deleteDialog.close();
      this.deleteProcess = false;
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
    if (this.deleteDialogEvent && this.deleteDialogEvent.confirm) {
      this.deleteDialogEvent.confirm.reject();
    }
    this.deleteDialogEvent = null;
  }

  onUserSelectRow(event): void {
    this.doctorEditorHidden = false;
    this.editableDoctorId = event.data.id;
  }

  onToggleUserEditor(userId: number): void {
    this.userEditorHidden = !this.userEditorHidden;
    this.editableUserId = userId;
  }

  onUserEdited(): void {
    this.doctorEditorComponent.reloadUsers();
  }
}
