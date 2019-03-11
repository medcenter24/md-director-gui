/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverMultiselectPage } from './cover.multiselect.page';
import { SelectorProviderMultipleComponent } from '../selector.provider.multiple.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectorConfig } from '../../../selector.config';
import { SimpleSearchProviderMock } from '../../../../../../test/samples/providers';
import { SearchFilter } from '../../../../../core/loadable/search.filter';

describe('Component: MultiselectComponent', () => {

  let component: SelectorProviderMultipleComponent;
  let fixture: ComponentFixture<SelectorProviderMultipleComponent>;
  let coverPage: CoverMultiselectPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectorProviderMultipleComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorProviderMultipleComponent);
    component = fixture.componentInstance;
    coverPage = new CoverMultiselectPage(fixture);
  });

  it('should create', function () {
    expect(component).toBeDefined();
  });

  it('should search data', done => {
    const mock = new SimpleSearchProviderMock();
    component.conf = SelectorConfig.instance({
      dataProvider: mock,
    });
    component.loadData().then(() => {
      expect(component.options).toEqual([
        { id: 1, value: 'value1' },
        { id: 2, value: 'value2' },
        { id: 3, value: 'value3' },
      ]);
      done();
    });
  });

  it('should search filtered data', done => {
    const mock = new SimpleSearchProviderMock();
    component.conf = SelectorConfig.instance({
      first: 1,
      dataProvider: mock,
    });
    const filter = SearchFilter.instance({ first: 1 });
    component.loadData(filter).then(() => {
      expect(component.options).toEqual([
        { id: 2, value: 'value2' },
        { id: 3, value: 'value3' },
      ]);
      done();
    });
  });
});
