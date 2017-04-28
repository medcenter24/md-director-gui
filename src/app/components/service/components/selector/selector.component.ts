/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, HostListener, ViewChild } from '@angular/core';
import { SelectServicesComponent } from '../select/select.component';

@Component({
  selector: 'services-selector',
  templateUrl: 'selector.html'
})
export class ServicesSelectorComponent {

  @ViewChild('servicesSelector')
    private servicesSelector: SelectServicesComponent;

  constructor () {}

  onServiceSelected(event): void {
    console.log(event);
  }
}
