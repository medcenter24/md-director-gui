/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Assistant } from '../../assistant';
import { AssistantsService } from '../../assistant.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-assistant-editor',
  templateUrl: './editor.html',
})
export class AssistantEditorComponent extends LoadableComponent {
  protected componentName: string = 'AssistantEditorComponent';

  @Input() assistant: Assistant;
  @Output() assistantSaved: EventEmitter<Assistant> = new EventEmitter<Assistant>();

  constructor(private service: AssistantsService) {
    super();
  }

  onSubmit(): void {
    this.initComponent();
    this.service.update(this.assistant).then(() => {
      this.loadedComponent();
      this.assistantSaved.emit(this.assistant);
    }).catch(() => {
      this.loadedComponent();
    });
  }
}
