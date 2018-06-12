/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../../core/components/componentLoader';
import { Accident } from '../../../accident';
import { CasesService } from '../../../../case/cases.service';
import { AccidentHistory } from '../history';
import { DateHelper } from '../../../../../helpers/date.helper';
import { layoutPaths } from '../../../../../theme';

@Component({
  selector: 'nga-accident-history',
  templateUrl: './history.html',
})
export class AccidentHistoryComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'AccidentHistoryComponent';

  @Input() accident: Accident;

  history: AccidentHistory[];
  noPhoto: string = '';

  constructor(private caseService: CasesService, private dateHelper: DateHelper) {
    super();
    this.noPhoto = `${layoutPaths.images.profile}no-photo.png`;
  }

  ngOnInit() {
    this.startLoader();
    this.caseService.getHistory(this.accident).then(response => {
      this.stopLoader();
      response.map((row) => {
        row.createdFormated = this.dateHelper.toEuropeFormatWithTime(row.created_at);
        return row;
      });
      this.history = response;
    }).catch(() => this.stopLoader());
  }
}
