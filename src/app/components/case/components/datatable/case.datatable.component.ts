/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableCol } from '../../../ui/datatable/datatable.col';
import { DatatableAction } from '../../../ui/datatable/datatable.action';
import { DatatableConfig } from '../../../ui/datatable/datatable.config';
import { CasesService } from '../../cases.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ExporterService } from '../../../exporter/exporter.service';
import { ImporterComponent } from '../../../importer/importer.component';

@Component({
  selector: 'nga-case-datatable',
  templateUrl: './case.datatable.html',
})
export class CaseDatatableComponent implements OnInit {

  @ViewChild('importer')
    importer: ImporterComponent;

  datatableConfig: DatatableConfig;
  langLoaded: boolean = false;

  constructor(
    public caseService: CasesService,
    private translateService: TranslateService,
    private router: Router,
    private exporterService: ExporterService,
  ) {}

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      const cols = [
        new DatatableCol('patientName', this.translateService.instant('Patient Name')),
        new DatatableCol('refNum', this.translateService.instant('Ref. Number')),
        new DatatableCol('assistantRefNum', this.translateService.instant('Assistant Ref Num')),
        new DatatableCol('createdAt', this.translateService.instant('Created At')),
        new DatatableCol('status', this.translateService.instant('Status')),
        new DatatableCol('checkpoints', this.translateService.instant('Checkpoints')),
        new DatatableCol('doctorsFee', this.translateService.instant('Doctors Fee')),
        new DatatableCol('price', this.translateService.instant('Price')),
        new DatatableCol('caseType', this.translateService.instant('Case Type')),
      ];

      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.caseService.getDatatableData(filters);
        },
        cols,
        refreshTitle: this.translateService.instant('Refresh'),
        captionPanelActions: [
          new DatatableAction(this.translateService.instant('Import'), 'fa-upload', () => {
            this.importer.showImporter();
          }),
          new DatatableAction(this.translateService.instant('Export'), 'fa-download', () => {
            this.exporterService.form1({});
          }),
        ],
        controlPanel: true,
        captionPanel: true,
        csvExportAll: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
            this.router.navigate(['pages/cases/new']);
          }),
        ],
        onRowSelect: event => {
          this.router.navigate(['pages/cases/', event.data.id]);
        },
      });
    });
  }
}
