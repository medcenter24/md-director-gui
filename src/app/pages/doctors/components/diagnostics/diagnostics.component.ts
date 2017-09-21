/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { DiagnosticEditorComponent } from '../../../../components/diagnostic/components/editor/editor.component';
import { Diagnostic } from '../../../../components/diagnostic/diagnostic';
import { DiagnosticService } from '../../../../components/diagnostic/diagnostic.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './diagnostics.html',
})
export class Diagnostics {

  @ViewChild(DiagnosticEditorComponent)
  private diagnosticComponent: DiagnosticEditorComponent;

  @ViewChild('deleteDialog')
  private deleteDialog: ModalComponent;

  @ViewChild('errorDialog')
  private errorDialog: ModalComponent;

  selectedDiagnostic: boolean = false;
  editCategories: boolean = false;
  currentDiagnostic: Diagnostic;
  query: string = '';
  categoryId: number = 0;
  errorMessage: string = '';

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
      title: {
        title: 'Title',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      disease_code: {
        title: 'Disease Code',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor (protected service: DiagnosticService, private loadingBar: SlimLoadingBarService) {
  }

  ngOnInit (): void {
    this.loadingBar.start();
    this.service.getDiagnostics().then((data) => {
      this.source.load(data);
      this.loadingBar.complete();
    }).catch((error) => {
      this.showError('Something bad happened, you can\'t load list of diagnostics');
      this.loadingBar.complete();
    });
  }

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;

  onDeleteDialogOk (): void {
    this.deleteProcess = true;
    this.loadingBar.start();
    this.service.delete(this.deleteDialogEvent.data.id).then(() => {
      this.deleteDialogEvent.confirm.resolve();
      this.deleteDialogEvent = null;
      this.deleteDialog.close();
      this.deleteProcess = false;
      this.selectedDiagnostic = false;
      this.editCategories = false;
      this.currentDiagnostic = null;
      this.categoryId = 0;
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
      this.showError('Something bad happened, you can\'t save diagnostic');
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
      this.showError('Something bad happened, you can\'t add diagnostic');
      this.loadingBar.complete();
    });
  }

  private showError (message: string): void {
    this.errorMessage = message;
    this.errorDialog.open('sm');
  }

  onUserSelectRow (event): void {
    this.selectedDiagnostic = true;
    this.currentDiagnostic = event.data;
    this.categoryId = this.currentDiagnostic.diagnostic_category_id;
  }

  onUpdateDiagnostic (diagnostic: Diagnostic): void {
    this.source.update(this.currentDiagnostic, diagnostic);
  }

  openCategoryEditor (event): void {
    this.editCategories = event.show;
    this.categoryId = event.categoryId;
  }

  onCategoryChanged (): void {
    this.diagnosticComponent.reloadCategories();
  }
}
