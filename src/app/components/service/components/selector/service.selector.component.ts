/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Service } from '../../service';
import { CasesService } from '../../../case/cases.service';
import { Logger } from 'angular2-logger/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { SelectServicesComponent } from '../select';

@Component({
  selector: 'nga-services-selector',
  templateUrl: 'selector.html',
})
export class ServiceSelectorComponent extends LoadableComponent implements OnInit {

  @Input() caseId: number = 0;
  @Output() priceChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedServices: EventEmitter<Service[]> = new EventEmitter<Service[]>();

  @ViewChild('selectServices')
    private selectServicesComponent: SelectServicesComponent;

  isLoaded: boolean = false;
  caseServices: Service[] = [];
  private sumPrices: number = 0;
  protected componentName: string = 'ServicesSelectorComponent';

  constructor (
    private casesService: CasesService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.isLoaded = true;
  }

  onDelete (service: Service): void {
    if (this.hasService(service)) {
      this.caseServices = this.caseServices.filter(function (el) {
        return el.id !== service.id;
      });
      this.recalculatePrice();
      this.selectServicesComponent.reloadChosenServices(this.caseServices);
      this.changedServices.emit(this.caseServices);
    }
  }

  onServicesChanged(): void {
    this.recalculatePrice();
    this.changedServices.emit(this.caseServices);
  }

  onSelectServicesLoaded(name: string): void {
    this.stopLoader(name);
    if (this.caseId) {
      this.startLoader();
      this.casesService.getCaseServices(this.caseId).then(services => {
        this.stopLoader();
        this.caseServices = services;
        this.selectServicesComponent.reloadChosenServices(this.caseServices);
        this.changedServices.emit(this.caseServices);
        this.recalculatePrice();
      }).catch((err) => {
        this.stopLoader();
        this._logger.error(err);
      });
    }
  }

  onSelectServicesInit(name: string): void {
    this.startLoader(name);
  }

  private hasService (service: Service): boolean {
    const result = this.caseServices.find(function (el) {
      return el.id === service.id;
    });

    return !!result;
  }

  recalculatePrice (): void {
    this.sumPrices = 0;
    this.caseServices.forEach(service => {
      this.sumPrices += +service.price;
    });
    this.sumPrices.toFixed(2);
    this.priceChanged.emit(this.sumPrices);
  }
}
