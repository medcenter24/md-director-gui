/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SelectServicesComponent } from '../select/select.component';
import { Service } from '../../service';
import { CasesService } from '../../../case/cases.service';

@Component({
  selector: 'services-selector',
  templateUrl: 'selector.html'
})
export class ServicesSelectorComponent {

  @Input() caseId: number = 0;

  @Output() loading: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('servicesSelector')
  private servicesSelector: SelectServicesComponent;

  private caseServices: Array<Service> = [];
  private sumPrices: number = 0;

  constructor (private casesService: CasesService) {
  }

  ngOnInit () {
    if (this.caseId) {
      this.loading.emit('selected-services');
      this.casesService.getCaseServices(this.caseId).then(services => {
        this.caseServices = services;
        this.loaded.emit('selected-services');
      }).catch((err) => {
        this.loaded.emit('selected-services');
        console.error('log_error: ', err);
      });
    }
  }

  onServiceSelected (event): void {
    if (!this.hasService(event)) {
      this.caseServices.push(event);
      this.recalculatePrice();
    }
  }

  onLoading (key): void {
    this.loading.emit(key);
  }

  onLoaded (key): void {
    this.loaded.emit(key);
  }

  onDelete (service: Service): void {
    if (this.hasService(service)) {
      this.caseServices = this.caseServices.filter(function (el) {
        return el.id !== service.id;
      });
      this.recalculatePrice();
    }
  }

  private hasService (service: Service): boolean {
    const result = this.caseServices.find(function (el) {
      return el.id === service.id;
    });

    return !!result;
  }

  private recalculatePrice (): void {
    this.sumPrices = 0;
    this.caseServices.forEach(service => this.sumPrices += service.price);
  }
}
