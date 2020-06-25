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

@Injectable()
export class CircleIconViewHelper {

  static COLOR_BLUE = 'blue';
  static COLOR_GREEN = 'green';
  static COLOR_RED = 'red';
  static COLOR_GREY = 'grey';

  static template(colorClass: string, iconClass: string): string {
    return `
                <div>
                    <div class="circle-icon m-auto ${colorClass}">
                        <span class="${iconClass}"></span>
                    </div>
                </div>
            `;
  }
}
