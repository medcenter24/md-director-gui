/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ServicesService } from '../../services.service';
import { SelectItem } from 'primeng/primeng';
import { Service } from '../../service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'select-services',
  templateUrl: './select.html'
})
export class SelectServicesComponent {

  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosenServicesChange: EventEmitter<Service[]> = new EventEmitter<Service[]>();

  @Input() chosenServices: Array<Service> = [];

  dataServices: SelectItem[] = [];
  selectedServices: Array<string> = [];
  services: Array<Service> = [];

  constructor (
    private servicesService: ServicesService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) {
  }

  ngOnInit () {
    this.loadingBar.start();
    this.servicesService.getServices().then(services => {
      this.services = services;
      this.dataServices = services.map(x => {
        return {
          label: '' + x.title,
          value: '' + x.id
        };
      });

      if (!this.selectedServices.length) {
        // to show placeholder
        this.selectedServices = [];
      }
      this.loadingBar.complete();
      this.loaded.emit();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

   onChanged(event): void {
     const services = this.services.filter(function (service) {
       return event.value.indexOf(service.id+'') !== -1;
     });

     this.chosenServicesChange.emit(services);
   }

   reloadChosenServices(services: Array<Service>): void {
     this.chosenServices = services;
     this.selectedServices = this.chosenServices.length ? this.chosenServices.map(x => x.id + '') : [];
   }
}
