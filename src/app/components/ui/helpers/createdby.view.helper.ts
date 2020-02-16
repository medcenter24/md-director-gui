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

import { Injectable } from '@angular/core';
import { CircleIconViewHelper } from './circle.icon.view.helper';

@Injectable()
export class CreatedbyViewHelper {

  static TYPE_DIRECTOR = 'director';
  static TYPE_DOCTOR = 'doctor';
  static TYPE_SYSTEM = 'system';

  static template (type: string): string {
    let icon = 'fa fa-question';
    let color = CircleIconViewHelper.COLOR_GREY;
    switch (type) {
      case CreatedbyViewHelper.TYPE_DIRECTOR:
        icon = 'fa fa-user';
        color = CircleIconViewHelper.COLOR_GREEN;
        break;
      case CreatedbyViewHelper.TYPE_DOCTOR:
        icon = 'fa fa-user-md';
        color = CircleIconViewHelper.COLOR_BLUE;
        break;
      case CreatedbyViewHelper.TYPE_SYSTEM:
        icon = 'fa fa-laptop';
        color = CircleIconViewHelper.COLOR_RED;
        break;
    }
    return CircleIconViewHelper.template(color, icon);
  }
}
