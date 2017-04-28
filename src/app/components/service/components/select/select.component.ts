/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewChild } from '@angular/core';
import { ServicesService } from '../../services.service';
import { SelectComponent } from 'ng2-select';
import { Service } from '../../service';

@Component({
  selector: 'select-services',
  templateUrl: './select.html'
})
export class SelectServicesComponent {

  protected searchStr: string;

  @ViewChild('servicesSelector')
    private servicesSelector: SelectComponent;

  private dataItems: Array<any> = [];
  private loadedServices: Array<Service> = [];

  constructor (private servicesService: ServicesService) { }

  ngOnInit () {
    this.servicesService.getServices().then(services => {
      this.loadedServices = services;
      this.dataItems = services.map(x => {
        return {
          id: x.id,
          text: '<div class="row"><div class="col-sm-6">' + x.title
            + '</div><div class="col-sm-6"><b>' + x.price + '</b></div></div>'
        };
      });
    }).catch((err) => {
      console.log('log_error: ', err);
    });
  }

  onSelected(event): void {
    console.log(event);
  }
}
