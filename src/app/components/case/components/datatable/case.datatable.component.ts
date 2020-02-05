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
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { Breadcrumb } from '../../../../theme/components/baContentTop/breadcrumb';
import { AccidentStatusService } from '../../../accident/components/status';
import { FilterRequestField, SortRequestField } from '../../../core/http/request/fields';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { LoadableServiceInterface } from '../../../core/loadable';
import { CaseAccident } from '../../case';
import { DatatableRequestBuilder } from '../../../ui/datatable/request/datatable.request.builder';
import { AutoCompleteSrcConfig } from '../../../ui/autosuggest/src';
import { Location } from '@angular/common';
import { RequestBuilder } from '../../../core/http/request';

@Component({
  selector: 'nga-case-datatable',
  templateUrl: './case.datatable.html',
})
export class CaseDatatableComponent extends AbstractDatatableController implements OnInit {
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
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected accidentStatusProvider: AccidentStatusService,
    private location: Location,
  ) {
    super();
  }

  protected onLangLoaded () {
    super.onLangLoaded();
    const breadcrumbs = [];
    breadcrumbs.push(new Breadcrumb('Cases', '/pages/cases', true));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  getDatatableComponent(): DatatableComponent {
    return this.datatableComponent;
  }

  getService(): LoadableServiceInterface {
    return this.caseService;
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('patientName', this.translateService.instant('Patient Name')),
      new DatatableCol('refNum', this.translateService.instant('Ref. Number')),
      new DatatableCol('assistantRefNum', this.translateService.instant('Assistant Ref Num')),
      new DatatableCol('createdAt', this.translateService.instant('Created At')),
      new DatatableCol('status', this.translateService.instant('Status')),
      // new DatatableCol('checkpoints', this.translateService.instant('Checkpoints')),
      // new DatatableCol('doctorsFee', this.translateService.instant('Doctors Fee')),
      new DatatableCol('price', this.translateService.instant('Income')),
      new DatatableCol('caseType', this.translateService.instant('Case Type')),
    ];
  }

  getEmptyModel (): Object {
    return new CaseAccident();
  }

  beforeDatatableLoad(): void {
    const breadcrumbs = [];
    breadcrumbs.push(new Breadcrumb('Loading'));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
    this.startLoader(this.datatableLoaderPrefix);
  }

  onDatatableLoaded(): void {
    const breadcrumbs = [];
    breadcrumbs.push(new Breadcrumb('Cases', '/pages/cases', true));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
    this.stopLoader(this.datatableLoaderPrefix);
  }

  protected hasControlPanel (): boolean {
    return true;
  }

  protected onRowSelect(event): void {
    this.router.navigate(['pages/cases/', event.data.id]).then();
  }

  protected hasCaptionPanel (): boolean {
    return true;
  }

  protected getControlPanelActions (): DatatableAction[] {
    return [new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
      this.router.navigate(['pages/cases/new'])
        .then().catch();
    })];
  }

  protected getCaptionActions (): DatatableAction[] {
    const actions = [];
    if (this.isImporterConfigured) {
      actions.push(
        new DatatableAction( this.translateService.instant( 'Company Case Import' ),
          'fa fa-upload',
          () => {
            this.importer.showImporter();
          }, this.isImporterConfigured),
      );
    }

    actions.push(
      new DatatableAction(this.translateService.instant('Cases Export'), 'fa fa-download', () => {
        this.exporterService.exportCases({});
      }),
    );

    actions.push(new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
      this.router.navigate(['pages/cases/new'])
        .then().catch();
    }));

    return actions;
  }

  private getHtmlState( val: string): string {
    const title = this.translateService.instant(val);
    return `<span>${title}</span>`;
  }

  private static getHtmlCaseType( val: string): string {
    return `
                <div>
                    <div class="circle-icon m-auto ${val === 'medcenter24\\mcCore\\App\\DoctorAccident'
      ? 'doctor' : 'hospital'}">
                        <span class="fa fa-${val === 'medcenter24\\mcCore\\App\\DoctorAccident'
      ? 'user-md' : 'hospital-o'}"></span>
                    </div>
                </div>
            `;
  }

  protected getTransformers (): DatatableTransformer[] {
    return [
      new DatatableTransformer('createdAt', val => DateHelper.toEuropeFormatWithTime(val)),
      new DatatableTransformer('caseType', val => CaseDatatableComponent.getHtmlCaseType(val)),
      new DatatableTransformer('status', val => this.getHtmlState(val)),
    ];
  }

  protected hasColumnFilters (): boolean {
    return true;
  }

  getRequestBuilder (): DatatableRequestBuilder {

    const requestBuilder = super.getRequestBuilder();
    requestBuilder.setSorter(new RequestBuilder([
      new SortRequestField('patientName'),
      new SortRequestField('createdAt'),
    ]));
    requestBuilder.setFilter(new RequestBuilder([
      new FilterRequestField('patientName', null, FilterRequestField.MATCH_CONTENTS, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('refNum', null, FilterRequestField.MATCH_START_WITH, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('assistantRefNum', null,
        FilterRequestField.MATCH_START_WITH, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('createdAt', null, FilterRequestField.MATCH_GREATER_EQUAL,
        FilterRequestField.TYPE_DATE_RANGE),
      new FilterRequestField('status', null, FilterRequestField.MATCH_IN, FilterRequestField.TYPE_SELECT,
        new AutoCompleteSrcConfig(
          (filters) => this.accidentStatusProvider.search(filters),
          1,
          25,
          this.translateService.instant('Status'),
          'title',
          'static',
          true,
        ),
      ),
    ]));

    const urlRequestBuilder = DatatableRequestBuilder.fromUrl(this.location.path(true));

    urlRequestBuilder.propagate(requestBuilder);

    return urlRequestBuilder;
  }
}
