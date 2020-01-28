/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { CasesService } from '../../cases.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ExporterService } from '../../../exporter/exporter.service';
import { ImporterComponent } from '../../../importer/importer.component';
import { DateHelper } from '../../../../helpers/date.helper';
import {
  DatatableAction,
  DatatableCol,
  DatatableComponent,
  DatatableConfig,
  DatatableTransformer,
} from '../../../ui/datatable';
import { ExtensionsService } from '../../../extensions/extensions.service';
import { LoadingComponent } from '../../../core/components/componentLoader';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { Breadcrumb } from '../../../../theme/components/baContentTop/breadcrumb';
import { AccidentStatusService } from '../../../accident/components/status';
import { RequestBuilder } from '../../../core/http/request';
import { FilterRequestField, SortRequestField } from '../../../core/http/request/fields';

@Component({
  selector: 'nga-case-datatable',
  templateUrl: './case.datatable.html',
})
export class CaseDatatableComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'CaseDatatableComponent';

  @ViewChild('importer')
    importer: ImporterComponent;

  @ViewChild('datatableComponent')
    datatableComponent: DatatableComponent;

  datatableConfig: DatatableConfig;
  langLoaded: boolean = false;
  isImporterConfigured: boolean = false;

  private datatableLoaderPrefix = 'Table';

  constructor(
    public caseService: CasesService,
    private translateService: TranslateService,
    private router: Router,
    private exporterService: ExporterService,
    private dateHelper: DateHelper,
    private extensionsService: ExtensionsService,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected accidentStatusProvider: AccidentStatusService,
  ) {
    super();
  }

  ngOnInit() {
    this.extensionsService.isPackageInstalled('McImport').then((state: boolean) => {
      this.isImporterConfigured = state;
      this.loadDatatable();
    });
  }

  beforeDatatableLoad(): void {
    this.startLoader(this.datatableLoaderPrefix);
  }

  onDatatableLoaded(): void {
    // this.assignGlobalSeeker();
    this.stopLoader(this.datatableLoaderPrefix);
  }

  /*private assignGlobalSeeker(): void {
    this._state.subscribe('seeker', (text: string) => {
      const refKey = { value: `%${text}%`, matchMode: 'like' } as FilterMetadata;
      this.applyFilters({ ref_num: refKey });
    });
  }*/

  private loadDatatable(): void {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;

      const breadcrumbs = [];
      breadcrumbs.push(new Breadcrumb('Cases', '/pages/cases', true));
      this._state.notifyDataChanged('menu.activeLink', breadcrumbs);

      const cols = [
        new DatatableCol('patientName', this.translateService.instant('Patient Name')),
        new DatatableCol('refNum', this.translateService.instant('Ref. Number')),
        new DatatableCol('assistantRefNum', this.translateService.instant('Assistant Ref Num')),
        new DatatableCol('createdAt', this.translateService.instant('Created At')),
        new DatatableCol('status', this.translateService.instant('Status')),
        new DatatableCol('checkpoints', this.translateService.instant('Checkpoints')),
        new DatatableCol('doctorsFee', this.translateService.instant('Doctors Fee')),
        new DatatableCol('price', this.translateService.instant('Income')),
        new DatatableCol('caseType', this.translateService.instant('Case Type')),
      ];

      this.datatableConfig = DatatableConfig.factory({
        dataProvider: this.caseService,
        cols,
        refreshTitle: this.translateService.instant('Refresh'),
        captionPanelActions: [
          new DatatableAction( this.translateService.instant( 'Company Case Import' ),
            'fa fa-upload',
            () => {
              if (this.isImporterConfigured) {
                this.importer.showImporter();
              }
          }, this.isImporterConfigured),

          new DatatableAction(this.translateService.instant('Cases Export'), 'fa fa-download', () => {
            this.exporterService.exportCases({});
          }),
        ],
        controlPanel: true,
        captionPanel: true,
        csvExportAll: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
            this.router.navigate(['pages/cases/new'])
              .then().catch();
          }),
        ],
        onRowSelect: event => {
          this.router.navigate(['pages/cases/', event.data.id]).then();
        },
        transformers: [
          new DatatableTransformer('createdAt', val => this.dateHelper.toEuropeFormatWithTime(val)),
          new DatatableTransformer('caseType', val => `
                <div>
                    <div class="circle-icon m-auto ${val === 'medcenter24\\mcCore\\App\\DoctorAccident'
            ? 'doctor' : 'hospital'}">
                        <span class="fa fa-${val === 'medcenter24\\mcCore\\App\\DoctorAccident'
            ? 'user-md' : 'hospital-o'}"></span>
                    </div>
                </div>
            `),
        ],
        showColumnFilters: true,
        filters: new RequestBuilder([
          new FilterRequestField('patientName', null, '%like%', 'text'),
          new FilterRequestField('refNum', null, 'like%', 'text'),
          new FilterRequestField('assistantRefNum', null, 'like%', 'text'),
          new FilterRequestField('createdAt', null, 'eq', 'rangeDate'),
          new FilterRequestField('status', null, 'eq', 'select', this.accidentStatusProvider),
        ]),
        sortBy: new RequestBuilder([
          new SortRequestField('patientName'),
          new SortRequestField('refNum'),
        ]),
      });
    });
  }
}
