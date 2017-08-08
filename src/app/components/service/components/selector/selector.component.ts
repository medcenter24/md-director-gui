/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectServicesComponent } from '../select/select.component';
import { Service } from '../../service';
import { CasesService } from '../../../case/cases.service';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'nga-services-selector',
  templateUrl: 'selector.html',
})
export class ServicesSelectorComponent implements OnInit {

  @Input() caseId: number = 0;
  @Output() priceChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedServices: EventEmitter<Service[]> = new EventEmitter<Service[]>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('selectServices')
    private selectServicesComponent: SelectServicesComponent;

  isLoaded: boolean = false;
  caseServices: Array<Service> = [];
  private sumPrices: number = 0;

  constructor (
    private casesService: CasesService,
    private _logger: Logger,
  ) {
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
    this.loaded.emit(name);
    if (this.caseId) {
      this.init.emit('ServicesSelectorComponent');
      this.casesService.getCaseServices(this.caseId).then(services => {
        this.caseServices = services;
        this.selectServicesComponent.reloadChosenServices(this.caseServices);
        this.changedServices.emit(this.caseServices);
        this.recalculatePrice();
        this.loaded.emit('ServicesSelectorComponent');
      }).catch((err) => {
        this._logger.error(err);
        this.loaded.emit('ServicesSelectorComponent');
      });
    }
  }

  onSelectServicesInit(name: string): void {
    this.init.emit(name);
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
