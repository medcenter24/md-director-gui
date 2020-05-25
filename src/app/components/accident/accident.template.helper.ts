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
import { CircleIconViewHelper } from '../ui/helpers/circle.icon.view.helper';

@Injectable()
export class AccidentTemplateHelper {

  static getHtmlAccidentType(val: string): string {
    const color = val === 'doctor'
      ? CircleIconViewHelper.COLOR_BLUE
      : CircleIconViewHelper.COLOR_GREEN;
    const icon = val === 'doctor' ? 'fa fa-user-md' : 'fa fa-hospital-o';
    return CircleIconViewHelper.template(color, icon);
  }
}
