/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SelectServicesComponent } from '../select/select.component';
import { Service } from '../../service';
import { CasesService } from '../../../case/cases.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'services-selector',
  templateUrl: 'selector.html'
})
export class ServicesSelectorComponent {

  @Input() caseId: number = 0;
  @Output() priceChanged: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('selectServices')
    private selectServicesComponent: SelectServicesComponent;

  caseServices: Array<Service> = [];
  private sumPrices: number = 0;

  constructor (
    private casesService: CasesService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) {
  }

  ngOnInit () {
    if (this.caseId) {
      this.loadingBar.start();
      this.casesService.getCaseServices(this.caseId).then(services => {
        this.caseServices = services;
        this.loadingBar.complete();
      }).catch((err) => {
        this.loadingBar.complete();
        this._logger.error(err);
      });
    }
  }

  onDelete (service: Service): void {
    if (this.hasService(service)) {
      this.caseServices = this.caseServices.filter(function (el) {
        return el.id !== service.id;
      });
      this.recalculatePrice();
      this.selectServicesComponent.reloadChosenServices(this.caseServices);
    }
  }

  private hasService (service: Service): boolean {
    const result = this.caseServices.find(function (el) {
      return el.id === service.id;
    });

    return !!result;
  }

  recalculatePrice (): void {
    this.sumPrices = 0;
    this.caseServices.forEach(service => this.sumPrices += service.price);
    this.priceChanged.emit(this.sumPrices);
  }
}
