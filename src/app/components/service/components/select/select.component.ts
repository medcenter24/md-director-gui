/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { SelectItem } from 'primeng/primeng';
import { Service } from '../../service';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'nga-select-services',
  templateUrl: './select.html',
})
export class SelectServicesComponent implements OnInit {

  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosenServicesChange: EventEmitter<Service[]> = new EventEmitter<Service[]>();
  @Input() chosenServices: Service[] = [];

  isLoaded: boolean = false;
  dataServices: SelectItem[] = [];
  selectedServices: string[] = [];
  services: Service[] = [];

  constructor (
    private servicesService: ServicesService,
    private _logger: Logger,
  ) { }

  ngOnInit () {
    this.init.emit('SelectServicesComponent');
    this.servicesService.getServices().then(services => {
      this.loaded.emit('SelectServicesComponent');
      this.services = services;
      this.dataServices = services.map(x => {
        return {
          label: `${x.title}`,
          value: `${x.id}`,
        };
      });

      if (!this.selectedServices.length) {
        // to show placeholder
        this.selectedServices = [];
      }
      this.isLoaded = true;
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('SelectServicesComponent');
    });
  }

   onChanged(event): void {
     const services = this.services.filter(function (service) {
       return event.value.indexOf(`${service.id}`) !== -1;
     });

     this.chosenServicesChange.emit(services);
   }

   reloadChosenServices(services: Service[]): void {
     this.chosenServices = services;
     this.selectedServices = this.chosenServices.length ? this.chosenServices.map(x => `${x.id}`) : [];
   }
}
