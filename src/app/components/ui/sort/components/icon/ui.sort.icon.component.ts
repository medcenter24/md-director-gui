/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component( {
  selector: 'nga-ui-sort-icon',
  template: `
    <span
      class="c-pointer"
      [ngClass]="directionClass"
      (click)="onClick()"
    ></span>`,
})
export class UiSortIconComponent {

  @Input() fieldName: string = '';
  @Input() set state(icon: string) {
    this.setIcon(icon);
  }

  @Output() click: EventEmitter<null> = new EventEmitter<null>();

  private currentIcon: string = '';

  directionClass: string = 'fa fa-spinner fa-spin';

  onClick(): void {
    this.click.emit();
  }

  private setIcon(icon: string): void {
    this.currentIcon = icon;
    switch (this.currentIcon) {
      case 'asc':
        this.directionClass = 'fa fa-sort-amount-asc';
        break;
      case 'desc':
        this.directionClass = 'fa fa-sort-amount-desc';
        break;
      case 'none':
      default:
        this.currentIcon = 'none';
        this.directionClass = 'fa fa-sort';
    }
  }
}
