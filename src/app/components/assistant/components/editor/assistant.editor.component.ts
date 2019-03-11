/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Assistant } from '../../assistant';
import { AssistantsService } from '../../assistant.service';
import { GlobalState } from '../../../../global.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-assistant-editor',
  templateUrl: './editor.html',
})
export class AssistantEditorComponent extends LoadableComponent {
  protected componentName: string = 'AssistantEditorComponent';

  @Input() assistant: Assistant;
  @Output() assistantSaved: EventEmitter<Assistant> = new EventEmitter<Assistant>();

  constructor(
    private service: AssistantsService,
    private _state: GlobalState,
    private translate: TranslateService,
  ) {
    super();
  }

  onSubmit(): void {
    const postfix = 'Delete';
    this.startLoader(postfix);
    this.service.save(this.assistant).then(() => {
      this.stopLoader(postfix);
      this.assistantSaved.emit(this.assistant);
    }).catch(() => this.stopLoader(postfix));
  }

  onDelete(): void {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: this.translate.instant('Delete'),
        message: this.translate.instant('Are you sure that you want to delete this assistant company?'),
        accept: () => {
          const postfix = 'Delete';
          this.startLoader(postfix);
          this.service.delete(this.assistant.id)
            .then(() => {
              this.assistantSaved.emit(this.assistant);
              this.assistant = null;
              this.stopLoader(postfix);
            })
            .catch(() => this.stopLoader(postfix));
        },
        icon: 'fa fa-window-close-o red',
      },
    );
  }
}
