/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadableComponent } from '../../core/components/componentLoader/LoadableComponent';
import { Commentary } from '../commentary';
import { layoutPaths } from '../../../theme';
import { DateHelper } from '../../../helpers/date.helper';

@Component({
  selector: 'nga-commentaries-component',
  templateUrl: './comments.html',
})
export class CommentsComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'CommentsComponent';

  @Input() comments: Commentary[] = [];
  @Output() message: EventEmitter<string> = new EventEmitter<string>();

  noPhoto: string = '';
  showEditor: boolean = false;
  text: string = '';

  constructor(private dateHelper: DateHelper) {
    super();
    this.noPhoto = `${layoutPaths.images.profile}no-photo.png`;
  }

  ngOnInit() {
    this.comments.map((row) => {
      row.created_at = this.dateHelper.toEuropeFormatWithTime(row.created_at);
      return row;
    });
  }

  addComment() {
    this.message.emit(this.text);
    this.text = '';
  }

  applyComment(comment: Commentary) {
    this.comments.push(comment);
  }
}
