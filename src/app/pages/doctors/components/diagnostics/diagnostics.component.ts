/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation } from '@angular/core';

import { DiagnosticsService } from './diagnostics.service';
import { LocalDataSource } from 'ng2-smart-table';

import { Diagnostic } from './components/diagnostic/diagnostic';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./diagnostics.scss'],
  templateUrl: './diagnostics.html',
})
export class Diagnostics {

  selectedDiagnostic: boolean = false;
  editCategories: boolean = false;
  currentDiagnostic: Diagnostic;
  query: string = '';

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

  constructor(protected service: DiagnosticsService) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUserSelectRow(event): void {
    this.selectedDiagnostic = true;
    this.currentDiagnostic = event.data;
  }

  onUpdateDiagnostic(diagnostic: Diagnostic): void {
    this.source.update(this.currentDiagnostic, diagnostic);
  }

  onChangeRow(event): void {
    // todo send request to update model in the storage
  }
}
