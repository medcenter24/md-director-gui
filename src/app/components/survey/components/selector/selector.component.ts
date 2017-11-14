/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Survey } from '../../survey';
import { SelectSurveysComponent } from '../select/select.component';
import { CasesService } from '../../../case/cases.service';

@Component({
  selector: 'nga-surveys-selector',
  templateUrl: 'selector.html',
})
export class SurveysSelectorComponent implements OnInit {

  @Input() caseId: number = 0;
  @Output() priceChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() changed: EventEmitter<Survey[]> = new EventEmitter<Survey[]>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('selectSurveys')
    private selectSurveysComponent: SelectSurveysComponent;

  isLoaded: boolean = false;
  caseSurveys: Survey[] = [];

  constructor (
    private casesService: CasesService,
    private _logger: Logger,
  ) {
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
    this.loaded.emit(name);
    if (this.caseId) {
      this.init.emit('SurveysSelectorComponent');
      this.casesService.getCaseSurveys(this.caseId).then(surveys => {
        this.caseSurveys = surveys;
        this.selectSurveysComponent.reloadChosenSurveys(this.caseSurveys);
        this.changed.emit(this.caseSurveys);
        this.loaded.emit('SurveysSelectorComponent');
      }).catch((err) => {
        this._logger.error(err);
        this.loaded.emit('SurveysSelectorComponent');
      });
    }
  }

  onSelectSurveysInit(name: string): void {
    this.init.emit(name);
  }

  private hasSurvey (survey: Survey): boolean {
    const result = this.caseSurveys.find(function (el) {
      return el.id === survey.id;
    });

    return !!result;
  }
}
