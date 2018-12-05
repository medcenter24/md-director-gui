/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormOption } from '../form.option';
import { FormOptionService } from '../form.option.service';

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

  constructor(
    public translateService: TranslateService,
    private formOptionService: FormOptionService,
  ) {}

  ngOnInit(): void {
    this.formOptionService.getOptions('App\\Accident')
      .then(data => this.parameters = data);
  }

  // do not allow to change variables because they could be used in template
  onAddParameter(param: string): void {
    this.selected.emit(param);
  }

}
