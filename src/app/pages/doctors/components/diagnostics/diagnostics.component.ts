/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { DiagnosticsService } from './diagnostics.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Diagnostic } from './components/diagnostic/diagnostic';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DiagnosticComponent } from "./components/diagnostic/diagnostic.component";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./diagnostics.scss'],
  templateUrl: './diagnostics.html',
})
export class Diagnostics {

  @ViewChild(DiagnosticComponent)
      private diagnosticComponent: DiagnosticComponent;

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
      protected service: DiagnosticsService,
      private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.start();
    this.service.getData().then((data) => {
      this.source.load(data);
      this.slimLoadingBarService.complete();
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(edit): void {
    console.log('save');
  }

  onCreateConfirm(edit): void {
    console.log('create');
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
