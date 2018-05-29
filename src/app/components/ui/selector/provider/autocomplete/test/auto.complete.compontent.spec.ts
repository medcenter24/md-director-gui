/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { AutoCompleteComponent } from '../auto.complete.component';
import { TestBed } from '@angular/core/testing';
import { AutoCompleteModule } from '../auto.complete.module';
import { SharedModule } from '../../../../../../test/core/shared.module';
import { AutoCompleteConfig } from '../auto.complete.config';
import { MockCityService } from '../../../../../../test/samples';

describe('Component: AutoCompleteComponent', () => {

  let component: AutoCompleteComponent;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        AutoCompleteModule,
      ],
    }).compileComponents()
      .then(() => {
        // console.log(fixture.nativeElement)
      });

    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', function () {
    expect(component).toBeDefined();
  });

  it('should exists with cities', function () {
    component.conf = AutoCompleteConfig.instance({
      dataProvider: MockCityService,
    });

    expect(component).toBeDefined();
    // let el = fixture.nativeElement.querySelector('li');
    // console.log(fixture.nativeElement)
  });
});
