/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { DatatableCol } from '../../../ui/datatable/datatable.col';
import { DatatableAction } from '../../../ui/datatable/datatable.action';
import { DatatableConfig } from '../../../ui/datatable/datatable.config';
import { CasesService } from '../../cases.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-case-datatable',
  templateUrl: './case.datatable.html',
})
export class CaseDatatableComponent implements OnInit {

  datatableConfig: DatatableConfig;
  langLoaded: boolean = false;

  constructor(
    private caseService: CasesService,
    private translateService: TranslateService,
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
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
            console.log('adding action');
          }),
        ],
        onRowSelect: event => {
          console.log('row selection');
        },
      });
    });
  }
}
