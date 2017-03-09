/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Diagnostic } from './components/diagnostic/diagnostic';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DiagnosticComponent } from "./components/diagnostic/diagnostic.component";
import {DiagnosticService} from "./components/diagnostic/diagnostic.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./diagnostics.scss'],
  templateUrl: './diagnostics.html',
})
export class Diagnostics {

  @ViewChild(DiagnosticComponent)
      private diagnosticComponent: DiagnosticComponent;

  @ViewChild('deleteDialog')
      private deleteDialog: ModalComponent;

  selectedDiagnostic: boolean = false;
  editCategories: boolean = false;
  currentDiagnostic: Diagnostic;
  query: string = '';
  categoryId: number = 0;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
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
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
      protected service: DiagnosticService,
      private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();
    this.service.getDiagnostics().then((data) => {
      this.source.load(data);
      this.slimLoadingBarService.complete();
    });
  }

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;

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

      this.selectedDiagnostic = false;
      this.editCategories = false;
      this.currentDiagnostic = null;
      this.categoryId = 0;
    }).catch(() => {
      this.slimLoadingBarService.color = '#f89711';
      this.slimLoadingBarService.complete();
      this.deleteDialogEvent.confirm.reject();
      this.deleteDialogEvent = null;
      this.deleteProcess = false;
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
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();
    this.service.update(event.newData.id).then(() => {
      event.confirm.resolve();
      this.slimLoadingBarService.complete();
    }).catch((reason) => {
      this.slimLoadingBarService.color = '#f89711';
      this.slimLoadingBarService.complete();
      event.confirm.reject();
      console.log(reason);
    });
  }

  onCreate(event): void {
    console.log(event);
  }

  onUserSelectRow(event): void {
    this.selectedDiagnostic = true;
    this.currentDiagnostic = event.data;
    this.categoryId = this.currentDiagnostic.diagnostic_category_id;
  }

  onUpdateDiagnostic(diagnostic: Diagnostic): void {
    this.source.update(this.currentDiagnostic, diagnostic);
  }

  onChangeRow(event): void {
    // todo send request to update model in the storage
  }

  openCategoryEditor(event): void {
    this.editCategories = event.show;
    this.categoryId = event.categoryId;
  }

  onCategoryChanged(): void {
    this.diagnosticComponent.reloadCategories();
  }
}
