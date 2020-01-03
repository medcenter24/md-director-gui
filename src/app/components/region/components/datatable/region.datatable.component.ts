/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
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
import { LoadableComponent } from '../../../core/components/componentLoader';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatatableConfig } from '../../../ui/datatable';
import { DatatableCol } from '../../../ui/datatable';
import { DatatableAction } from '../../../ui/datatable';
import { RegionService } from '../../region.service';
import { Region } from '../../region';
import { DatatableComponent } from '../../../ui/datatable';
import { CountryService } from '../../../country';
import { AutocompleterComponent } from '../../../ui/selector/components/autocompleter';

@Component({
  selector: 'nga-region-datatable',
  templateUrl: './region.datatable.html',
})
export class RegionDatatableComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'RegionDatatableComponent';

  @ViewChild('datatable')
    private datatable: DatatableComponent;

  @ViewChild('countryAutocompleterComponent')
    private countryAutocompleterComponent: AutocompleterComponent;

  displayDialog: boolean;
  langLoaded: boolean = false;
  datatableConfig: DatatableConfig;

  region: Region;

  constructor(
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private regionService: RegionService,
    public countryService: CountryService,
  ) {
    super();
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.regionService.search(filters);
        },
        cols: [
          new DatatableCol('title', this.translateService.instant('Title')),
        ],
        refreshTitle: this.translateService.instant('Refresh'),
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
            this.showDialogToAdd();
          }),
        ],
        onRowSelect: event => {
          this.onRowSelect(event);
        },
        sortBy: 'title',
      });
    });
  }

  showDialogToAdd() {
    this.setRegion(new Region());
    this.setAutocompleterCountry(0);
    this.displayDialog = true;
  }

  private setRegion(region: Region = null): void {
    this.region = region;
  }

  save() {
    const postfix = 'Save';
    this.startLoader(postfix);
    this.regionService.save(this.region)
      .then(() => {
        this.stopLoader(postfix);
        this.setRegion();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => this.stopLoader(postfix));
  }

  onRowSelect(event) {
    this.setRegion(this.cloneRegion(event.data));
    this.setAutocompleterCountry(event.data.id);
    this.displayDialog = true;
  }

  private setAutocompleterCountry(countryId: number): void {
    if (this.countryAutocompleterComponent) {
      this.countryAutocompleterComponent.selectItems(countryId);
    }
  }

  cloneRegion( c: Region): Region {
    const region = new Region();
    for (const prop of Object.keys(c)) {
      region[prop] = c[prop];
    }
    return region;
  }

  delete() {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: this.translateService.instant('Delete'),
        message: this.translateService.instant('Are you sure that you want to delete region?'),
        accept: () => {
          const postfix = 'Delete';
          this.startLoader(postfix);
          this.regionService.destroy(this.region)
            .then(() => {
              this.stopLoader(postfix);
              this.setRegion();
              this.displayDialog = false;
              this.datatable.refresh();
            })
            .catch(() => this.stopLoader(postfix));
        },
        icon: 'fa fa-window-close-o red',
      },
    );
  }
}
