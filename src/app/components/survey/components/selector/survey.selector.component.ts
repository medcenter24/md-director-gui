/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Survey } from '../../survey';
import { CasesService } from '../../../case/cases.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { SurveySelectComponent } from '../select/survey.select.component';

@Component({
  selector: 'nga-surveys-selector',
  templateUrl: 'selector.html',
})
export class SurveysSelectorComponent extends LoadableComponent implements OnInit {

  @Input() caseId: number = 0;
  @Output() priceChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() changed: EventEmitter<Survey[]> = new EventEmitter<Survey[]>();

  @ViewChild('selectSurveys')
    private selectSurveysComponent: SurveySelectComponent;

  isLoaded: boolean = false;
  caseSurveys: Survey[] = [];
  protected componentName: string = 'SurveysSelectorComponent';

  constructor (
    private casesService: CasesService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.isLoaded = true;
  }

  onDelete (survey: Survey): void {
    if (this.hasSurvey(survey)) {
      this.caseSurveys = this.caseSurveys.filter(function (el) {
        return el.id !== survey.id;
      });
      this.selectSurveysComponent.reloadChosenSurveys(this.caseSurveys);
      this.changed.emit(this.caseSurveys);
    }
  }

  onSurveysChanged(): void {
    this.changed.emit(this.caseSurveys);
  }

  onSelectSurveysLoaded(name: string): void {
    this.onLoaded(name);
    if (this.caseId) {
      this.initComponent();
      this.casesService.getCaseSurveys(this.caseId).then(surveys => {
        this.caseSurveys = surveys;
        this.selectSurveysComponent.reloadChosenSurveys(this.caseSurveys);
        this.changed.emit(this.caseSurveys);
        this.loadedComponent();
      }).catch((err) => {
        this._logger.error(err);
        this.loadedComponent();
      });
    }
  }

  onSelectSurveysInit(name: string): void {
    this.onInit(name);
  }

  private hasSurvey (survey: Survey): boolean {
    const result = this.caseSurveys.find(function (el) {
      return el.id === survey.id;
    });

    return !!result;
  }
}
