/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormOption } from '../form.option';

@Component({
  selector: 'nga-forms-options-editor',
  templateUrl: './forms.options.editor.html',
})
export class FormsOptionsEditorComponent implements OnInit {

  /**
   * Type which determine possible parameters
   * @type {string}
   */
  @Input() formableType: string = '';
  /**
   * Selected parameter
   * @type {EventEmitter<string>}
   */
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  parameters: FormOption[] = [];

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.get('Yes').subscribe(() => {
      if (this.formableType === 'App\\Accident') {
        this.parameters = [
          new FormOption(this.translateService.instant('Patient Name'), 'patient.name'),
          new FormOption(this.translateService.instant('Doctor Name'), 'doctor.name'),
          new FormOption(this.translateService.instant('Ref. Number'), 'ref.number'),
          new FormOption(this.translateService.instant('Hospital Title'), 'hospital.title'),
          new FormOption(this.translateService.instant('Company Name'), 'company.name'),
        ];
      }
    });
  }

  // do not allow to change variables because they could be used in template
  onAddParameter(param: string): void {
    this.selected.emit(param);
  }

}
