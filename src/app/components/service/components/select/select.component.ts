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
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-select-services',
  templateUrl: './select.html',
})
export class SelectServicesComponent extends LoadableComponent implements OnInit {

  @Output() chosenServicesChange: EventEmitter<Service[]> = new EventEmitter<Service[]>();
  @Input() chosenServices: Service[] = [];

  isLoaded: boolean = false;
  dataServices: SelectItem[] = [];
  selectedServices: string[] = [];
  services: Service[] = [];
  protected componentName: string = 'SelectServicesComponent';

  constructor (
    private servicesService: ServicesService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.initComponent();
    this.servicesService.getServices().then(services => {
      this.loadedComponent();
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
      this.loadedComponent();
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
