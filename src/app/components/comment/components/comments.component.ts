/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadableComponent } from '../../core/components/componentLoader/LoadableComponent';
import { Commentary } from '../commentary';
import { layoutPaths } from '../../../theme';
import { DateHelper } from '../../../helpers/date.helper';

@Component({
  selector: 'nga-commentaries-component',
  templateUrl: './comments.html',
})
export class CommentsComponent extends LoadableComponent {

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

  addComment() {
    this.message.emit(this.text);
    this.text = '';
  }

  applyComment(comment: Commentary) {
    comment.created_at = this.dateHelper.toEuropeFormatWithTime(comment.created_at);
    this.comments.push(comment);
  }
}
