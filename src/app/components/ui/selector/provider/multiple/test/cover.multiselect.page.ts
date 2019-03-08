/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
