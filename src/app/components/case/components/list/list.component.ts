/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Response } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { Router } from '@angular/router';
import { CasesService } from '../../cases.service';
import { CaseAccident } from '../../case';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list.html',
})
export class CasesListComponent {

  @ViewChild('errorDialog')
  errorDialog: ModalComponent;

  query: string = '';

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;
  errorMessage: string = '';
  errorResponse: Response = null;

  settings = {
    mode: 'external',
    hideSubHeader: false,
    actions: {
      columnTitle: '',
      edit: true,
      add: true,
      'delete': false,
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>'
    },
    edit: {
      editButtonContent: '<i class="ion-ios-arrow-right"></i>'
    },
    columns: {
      ref_num: {
        title: 'Ref. Number',
        type: 'string'
      },
      case_type: {
        title: 'Case Type',
        type: 'string'
      },
      created_at: {
        title: 'Created at',
        type: 'string'
      },
      checkpoints: {
        title: 'Checkpoints',
        type: 'string'
      },
      status: {
        title: 'Status',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor (protected service: CasesService, public router: Router, private slimLoader: SlimLoadingBarService) {
  }

  ngOnInit (): void {
    this.startLoading();
    this.service.getCases().then((data: CaseAccident[]) => {
      this.source.load(data);
      this.completeLoading();
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of cases', response);
      this.errorLoading();
    });
  }

  startLoading (): void {
    this.slimLoader.start();
  }

  completeLoading (): void {
    this.slimLoader.complete();
  }

  errorLoading (): void {
    this.slimLoader.color = 'firebrick';
    this.slimLoader.complete();
  }

  onEdit (event): void {
    this.router.navigate([ 'pages/cases/', event.data.id ]);
  }

  onCreate (): void {
    this.router.navigate([ 'pages/cases/new' ]);
  }

  private showError (message: string, response: Response = null): void {
    this.errorMessage = message;
    if (response) {
      this.errorResponse = response;
    }
    this.errorDialog.open('sm');
  }
}
