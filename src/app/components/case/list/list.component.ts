/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { Response} from '@angular/http';
import { ModalComponent} from 'ng2-bs3-modal/components/modal';
import { Router} from '@angular/router';
import { CasesService} from '../cases.service';
import { CaseAccident} from '../case';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  templateUrl: './list.html',
})
export class CasesListComponent {

  @ViewChild('loadingBarCasesList')
    loadingBar: SlimLoadingBarComponent;

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

  constructor(protected service: CasesService, public router: Router) { }

  ngOnInit(): void {
    this.startLoading();
    this.service.getCases().then((data: CaseAccident[]) => {
      this.source.load(data);
      this.completeLoading();
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of cases', response);
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

  onEdit(event): void {
    this.router.navigate(['pages/cases/', event.data.id]);
  }

  onCreate(): void {
    this.router.navigate(['pages/cases/new']);
  }

  private showError(message: string, response: Response = null): void {
    this.errorMessage = message;
    if (response) {
      this.errorResponse = response;
    }
    this.errorDialog.open('sm');
  }
}
