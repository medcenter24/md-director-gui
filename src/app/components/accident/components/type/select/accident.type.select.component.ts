/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AccidentType } from '../type';
import { AccidentTypesService } from '../types.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../../../../core/components/componentLoader';

@Component({
  selector: 'nga-select-accident-type',
  templateUrl: './accident.type.select.html',
})
export class AccidentTypeSelectComponent extends LoadableComponent {

  @Input() set typeId(id: number) {
    this.selectType(id);
  }
  @Output() selected: EventEmitter<AccidentType> = new EventEmitter<AccidentType>();

  isLoaded: boolean = false;
  private selectedType: AccidentType = new AccidentType();
  private loadedTypes: AccidentType[] = [];
  protected componentName: string = 'SelectAccidentTypeComponent';

  constructor (
    private accidentTypesService: AccidentTypesService,
    private translate: TranslateService,
  ) {
    super();
  }

  private selectType(id: number): void {
    this.translate.get('Insurance').subscribe(() => {
      const postfix = 'Select';
      this.startLoader(postfix);
      this.accidentTypesService.getTypes().then((types: AccidentType[]) => {
        this.stopLoader(postfix);
        this.loadedTypes = types;
        this.loadedTypes.map((v: AccidentType, i: number) => {
          v.trTitle = this.translate.instant(`${v.title} case`);
          if (!i || +v.id === +id) {
            this.selectedType = v;
          }
        });
        const filtered = this.loadedTypes.filter(value => value.id === id);
        if (filtered.length) {
          this.selectedType = filtered.pop();
        }
        this.isLoaded = true;
      }).catch(() => this.stopLoader(postfix));
    });
  }

  onChanged(): void {
    this.selected.emit(this.selectedType);
  }
}
