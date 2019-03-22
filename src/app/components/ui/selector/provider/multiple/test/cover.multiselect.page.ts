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

import { ComponentFixture } from '@angular/core/testing';
import { SelectorProviderMultipleComponent } from '../selector.provider.multiple.component';

export class CoverMultiselectPage {

  // getter properties wait to query the DOM until called.
  get mainInput() { return this.query<HTMLInputElement>('input'); }

  constructor (private fixture: ComponentFixture<SelectorProviderMultipleComponent>) { }

  private query<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
