/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CompleterData, CompleterService } from 'ng2-completer';

@Component({
  selector: 'select-services',
  templateUrl: './select.html'
})
export class SelectServicesComponent {

  public myForm: FormGroup;
  protected searchStr: string;
  protected dataService: CompleterData;

  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  constructor (
      private builder: FormBuilder,
      private _sanitizer: DomSanitizer,
      private completerService: CompleterService) { }

  ngOnInit () {
    this.myForm = this.builder.group({
      service: '',
    });

    this.dataService = this.completerService.local(this.searchData, 'color', 'color');
  }

  onSelected(event): void {
    console.log(event);
  }
}
