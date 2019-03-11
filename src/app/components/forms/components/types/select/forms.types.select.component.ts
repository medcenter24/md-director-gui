/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormType } from '../form.type';

@Component({
  selector: 'nga-forms-types-select',
  templateUrl: './forms.types.select.html',
})
export class FormsTypesSelectComponent implements OnInit {

  /**
   * Type which determine possible parameters
   * @type {string}
   */
  @Input() set formableType(type: string) {
    this.currentType = this.formableTypes.filter(v => v.key === type)[0];
  }
  /**
   * Selected parameter
   * @type {EventEmitter<string>}
   */
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  currentType: FormType;
  formableTypes: FormType[] = [];
  filteredFormableTypes: FormType[] = [];

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.get('Yes').subscribe(() => {
      if (!this.currentType) {
        this.currentType = new FormType('App\\Accident', this.translateService.instant('Case'));
      }

      this.filteredFormableTypes = this.formableTypes = [
        this.currentType,
      ];
    });
  }

  filterFormableTypes(event): void {
    this.filteredFormableTypes = this.formableTypes;
    this.filteredFormableTypes = [];
    for (const type of this.formableTypes) {
      if (type.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredFormableTypes.push(type);
      }
    }
  }

}
