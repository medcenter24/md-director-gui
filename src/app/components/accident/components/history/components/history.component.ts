/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../../core/components/componentLoader/LoadableComponent';
import { Accident } from '../../../accident';
import { CasesService } from '../../../../case/cases.service';
import { AccidentHistory } from '../history';
import { DateHelper } from '../../../../../helpers/date.helper';
import { layoutPaths } from '../../../../../theme';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'nga-accident-history',
  templateUrl: './history.html',
})
export class AccidentHistoryComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'AccidentHistoryComponent';

  @Input() accident: Accident;

  history: AccidentHistory[];
  noPhoto: string = '';

  constructor(private caseService: CasesService, public dateHelper: DateHelper) {
    super();
    this.noPhoto = `${layoutPaths.images.profile}no-photo.png`;
  }

  ngOnInit() {
    this.initComponent();
    this.caseService.getHistory(this.accident).then(response => {
      this.loadedComponent();
      response.map((row) => {
        row.createdFormated = this.dateHelper.toEuropeFormatWithTime(row.created_at)
        return row;
      });
      this.history = response;
    }).catch(() => this.loadedComponent());
  }
}
