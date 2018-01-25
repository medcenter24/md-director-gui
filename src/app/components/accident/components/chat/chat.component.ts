/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { Accident } from '../../accident';

@Component({
  selector: 'nga-accident-chat',
  templateUrl: './chat.html',
})
export class AccidentChatComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'AccidentChatComponent';

  @Input() accident: Accident;

  constructor() {
    super();
  }

  ngOnInit() {}
}
