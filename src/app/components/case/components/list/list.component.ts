/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Response } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { Router } from '@angular/router';
import { CasesService } from '../../cases.service';
import { CaseAccident } from '../../case';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ImporterComponent } from '../../../importer/importer.component';
import { Pagination } from '../../../ui/pagination';
import { ExporterService } from '../../../exporter/exporter.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list.html',
})
export class CasesListComponent implements OnInit {

  @ViewChild('errorDialog')
    errorDialog: ModalComponent;

  @ViewChild('importer')
    importer: ImporterComponent;

  query: string = '';
  pagination: Pagination = new Pagination();

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;
  errorMessage: string = '';
  errorResponse: Response = null;

  settings = {
    pager: {
      display: false,
    },
    mode: 'external',
    hideSubHeader: false,
    actions: {
      columnTitle: '',
      edit: true,
      add: true,
      'delete': false,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-ios-arrow-right"></i>',
    },
    columns: {
      ref_num: {
        title: 'Ref. Number',
        type: 'string',
      },
      case_type: {
        title: 'Case Type',
        type: 'string',
      },
      created_at: {
        title: 'Created at',
        type: 'string',
      },
      checkpoints: {
        title: 'Checkpoints',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction: (cell) => {
          return this.translate.instant(cell.toString());
        },
      },
      fee: {
        title: 'Doctors fee',
        type: 'number',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor (
    protected service: CasesService,
    public router: Router,
    private slimLoader: SlimLoadingBarService,
    private exporterService: ExporterService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit (): void {
    this.reloadDatatable({});
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
    this.router.navigate(['pages/cases/', event.data.id]);
  }

  onCreate (): void {
    this.router.navigate(['pages/cases/new']);
  }

  reloadDatatable(params): void {
    this.startLoading();
    this.service.getCases(params).then(response => {
      const paginator = response.meta.pagination;
      const accidents = response.data as CaseAccident[];
      this.source.load(accidents);

      this.pagination.rows = paginator.per_page;
      this.pagination.total = paginator.total;
      this.pagination.first = (paginator.current_page - 1) * paginator.per_page;
      this.pagination.show = true;

      this.completeLoading();
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of cases', response);
      this.errorLoading();
    });
  }

  openImporter (): void {
    this.importer.showImporter();
  }

  exportCases(): void {
    this.exporterService.form1({});
  }

  onPageChanged(event): void {
    this.reloadDatatable(event);
  }

  private showError (message: string, response: Response = null): void {
    this.errorMessage = message;
    if (response) {
      this.errorResponse = response;
    }
    this.errorDialog.open('sm');
  }
}
