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

@Component({
  selector: 'nga-select-surveys',
  templateUrl: './select.html',
})
export class SelectSurveysComponent implements OnInit {

  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosenSurveysChange: EventEmitter<Survey[]> = new EventEmitter<Survey[]>();
  @Input() chosenSurveys: Survey[] = [];

  isLoaded: boolean = false;
  dataSurveys: SelectItem[] = [];
  selectedSurveys: string[] = [];
  surveys: Survey[] = [];

  constructor (
    private surveysService: SurveyService,
    private _logger: Logger,
  ) { }

  ngOnInit () {
    this.init.emit('SelectSurveysComponent');
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
      this.loaded.emit('SelectSurveysComponent');
      this.isLoaded = true;
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('SelectSurveysComponent');
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
