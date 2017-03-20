/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import {SlimLoadingBarComponent} from 'ng2-slim-loading-bar';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {DiagnosticEditorComponent} from "../../../../components/diagnostic/editor/editor.component";
import {Diagnostic} from "../../../../components/diagnostic/diagnostic";
import {DiagnosticService} from "../../../../components/diagnostic/diagnostic.service";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  templateUrl: './diagnostics.html',
})
export class Diagnostics {

  @ViewChild('loadingBarDiagnosticList')
    private loadingBar: SlimLoadingBarComponent;

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
      comment: {
        title: 'Commentary',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
      protected service: DiagnosticService
  ) { }

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

  ngOnInit(): void {
    this.startLoading();
    this.service.getDiagnostics().then((data) => {
      this.source.load(data);
      this.completeLoading();
    }).catch((error) => {
      this.errorLoading();
      this.showError('Something bad happened, you can\'t load list of diagnostics');
      this.completeLoading();
    });
  }

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;

  onDeleteDialogOk(): void {
    this.deleteProcess = true;
    this.startLoading();
    this.service.delete(this.deleteDialogEvent.data.id).then(() => {
      this.deleteDialogEvent.confirm.resolve();
      this.deleteDialogEvent = null;
      this.deleteDialog.close();
      this.deleteProcess = false;
      this.selectedDiagnostic = false;
      this.editCategories = false;
      this.currentDiagnostic = null;
      this.categoryId = 0;
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
      this.showError('Something bad happened, you can\'t save diagnostic');
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
      this.showError('Something bad happened, you can\'t add diagnostic')
      this.completeLoading();
    });
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.errorDialog.open('sm');
  }

  onUserSelectRow(event): void {
    this.selectedDiagnostic = true;
    this.currentDiagnostic = event.data;
    this.categoryId = this.currentDiagnostic.diagnostic_category_id;
  }

  onUpdateDiagnostic(diagnostic: Diagnostic): void {
    this.source.update(this.currentDiagnostic, diagnostic);
  }

  openCategoryEditor(event): void {
    this.editCategories = event.show;
    this.categoryId = event.categoryId;
  }

  onCategoryChanged(): void {
    this.diagnosticComponent.reloadCategories();
  }
}
