/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Logger } from 'angular2-logger/core';
import { Survey } from '../../survey';
import { SurveyService } from '../../survey.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-select-surveys',
  templateUrl: './select.html',
})
export class SurveySelectComponent extends LoadableComponent implements OnInit {

  @Output() chosenSurveysChange: EventEmitter<Survey[]> = new EventEmitter<Survey[]>();
  @Input() chosenSurveys: Survey[] = [];

  isLoaded: boolean = false;
  dataSurveys: SelectItem[] = [];
  selectedSurveys: string[] = [];
  surveys: Survey[] = [];
  protected componentName: string = 'SelectSurveysComponent';

  constructor (
    private surveysService: SurveyService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.initComponent();
    this.surveysService.getSurveys().then(surveys => {
      this.surveys = surveys;
      this.dataSurveys = surveys.map(x => {
        return {
          label: `${x.title}`,
          value: `${x.id}`,
        };
      });

      if (!this.selectedSurveys.length) {
        // to show placeholder
        this.selectedSurveys = [];
      }
      this.isLoaded = true;
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

   onChanged(event): void {
     const surveys = this.surveys.filter(function (survey) {
       return event.value.indexOf(`${survey.id}`) !== -1;
     });

     this.chosenSurveysChange.emit(surveys);
   }

   reloadChosenSurveys(surveys: Survey[]): void {
     this.chosenSurveys = surveys;
     this.selectedSurveys = this.chosenSurveys.length ? this.chosenSurveys.map(x => `${x.id}`) : [];
   }
}
