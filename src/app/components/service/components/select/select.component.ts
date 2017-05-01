/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { SelectComponent } from 'ng2-select';
import { Service } from '../../service';

@Component({
  selector: 'select-services',
  templateUrl: './select.html'
})
export class SelectServicesComponent {

  @Output() loading: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() selected: EventEmitter<Service> = new EventEmitter<Service>();

  @ViewChild('servicesSelect')
    private servicesSelect: SelectComponent;

  private dataItems: Array<any> = [];
  private loadedServices: Array<Service> = [];

  constructor (private servicesService: ServicesService) { }

  ngOnInit () {
    this.loading.emit('select-services');
    this.servicesService.getServices().then(services => {
      this.loadedServices = services;
      this.dataItems = services.map(x => {
        return {
          id: x.id,
          text: '<div class="row margin-0"><div class="col-sm-6">' + x.title
            + '</div><div class="col-sm-6"><b>' + x.price + '</b></div></div>'
        };
      });
      this.loaded.emit('select-services');
    }).catch((err) => {
      this.loaded.emit('select-services');
      console.error('log_error: ', err);
    });
  }

  onSelected(event): void {
    const service = this.loadedServices.find(function (el) {
      return el.id === event.id;
    });

    this.servicesSelect.remove(event);
    this.selected.emit(service);
  }
}
