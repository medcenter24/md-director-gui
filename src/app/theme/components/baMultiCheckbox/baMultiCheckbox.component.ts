/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import {Component, Input, Self} from '@angular/core';
import {ControlValueAccessor, NgModel} from '@angular/forms';

@Component({
  selector: 'ba-multi-checkbox[ngModel]',
  templateUrl: './baMultiCheckbox.html',
  styleUrls: ['./baMultiCheckbox.scss'],
  providers: [NgModel]
})
export class BaMultiCheckbox implements ControlValueAccessor {
  @Input() baMultiCheckboxClass:string;
  @Input() propertiesMapping:any;

  public model: NgModel;
  public state: boolean;

  public constructor(@Self() state:NgModel) {
    this.model = state;
    state.valueAccessor = this;
  }

  public getProp(item: any, propName: string): string {
    const prop = this.propertiesMapping[propName];
    if (!prop) {
      return item[propName];
    } else if (typeof prop === 'function') {
      return prop(item);
    }
    return item[prop];
  }
  public onChange(value: any): void {}
  public onTouch(value: any): void {}
  public writeValue(state: any): void {
    this.state = state;
  }

  public registerOnChange(fn: any): void {
    this.onChange = function(state: boolean) {
      this.writeValue(state);
      this.model.viewToModelUpdate(state);
    };
  }
  public registerOnTouched(fn: any): void { this.onTouch = fn; }
}
