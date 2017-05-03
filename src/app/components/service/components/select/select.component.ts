/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ServicesService } from '../../services.service';
import { SelectItem } from 'primeng/primeng';
import { Service } from '../../service';

@Component({
  selector: 'select-services',
  templateUrl: './select.html'
})
export class SelectServicesComponent {

  @Output() loading: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  @Input() chosenServices: Array<Service> = [];
  @Output() chosenServicesChange: EventEmitter<Service[]> = new EventEmitter<Service[]>();

  dataServices: SelectItem[] = [];
  selectedServices: Array<string> = [];
  services: Array<Service> = [];

  constructor (private servicesService: ServicesService) {
  }

  ngOnInit () {
    this.reloadChosenServices(this.chosenServices);

    this.loading.emit('select-services');
    this.servicesService.getServices().then(services => {
      this.services = services;
      this.dataServices = services.map(x => {
        return {
          label: '' + x.title,
          value: '' + x.id
        };
      });

      this.loaded.emit('select-services');
    }).catch((err) => {
      this.loaded.emit('select-services');
      console.error('log_error: ', err);
    });
  }

   onChanged(event): void {
     const services = this.services.filter(function (service) {
       return event.value.indexOf(service.id+'') !== -1;
     });

     this.chosenServicesChange.emit(services);
   }

   reloadChosenServices(services): void {
     this.chosenServices = services;
     this.selectedServices = this.chosenServices.map(x => x.id+'');
   }
}
