/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { Accident } from '../../accident';
import { CasesService } from '../../../case/cases.service';
import { Commentary } from '../../../comment/commentary';
import { CommentsComponent } from '../../../comment/components/comments.component';
import { DateHelper } from '../../../../helpers/date.helper';

@Component({
  selector: 'nga-accident-chat',
  templateUrl: './chat.html',
})
export class AccidentChatComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'AccidentChatComponent';

  @Input() accident: Accident;

  @ViewChild('commentariesComponent')
    private commentariesComponent: CommentsComponent;

  comments: Commentary[] = [];

  constructor(private caseService: CasesService, private dateHelper: DateHelper) {
    super();
  }

  ngOnInit() {
    this.initComponent();
    this.caseService.getCommentaries(this.accident).then(response => {
      this.loadedComponent();
      response.map((row) => {
        row.created_at = this.dateHelper.toEuropeFormatWithTime(row.created_at);
        return row;
      });
      this.comments = response;
    }).catch(() => this.loadedComponent());
  }

  createCommentary(text: string) {
    this.initComponent();
    this.caseService.createComment(this.accident, text).then(comment => {
      this.loadedComponent();
      this.commentariesComponent.applyComment(comment);
    }).catch(() => this.loadedComponent());
  }
}
