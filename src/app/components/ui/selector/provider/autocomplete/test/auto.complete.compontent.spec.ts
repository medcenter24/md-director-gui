/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { AutoCompleteComponent } from '../auto.complete.component';
import { TestBed } from '@angular/core/testing';
import { AutoCompleteModule } from '../auto.complete.module';

describe('AutoCompleteComponent', () => {
  it('should create', function () {
    TestBed.configureTestingModule({
      imports: [
        AutoCompleteModule,
      ],
    }).compileComponents();

    /*const comp = new AutoCompleteComponent();
    comp.config = AutoCompleteConfig.instance({});*/

    const fixture = TestBed.createComponent(AutoCompleteComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
