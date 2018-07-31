/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { Upload } from '../../../upload/upload';
import { HospitalAccident } from '../../hospitalAccident';

@Component({
  selector: 'nga-ha-assistant-guarantee',
  templateUrl: './ha.assistant.guarantee.html',
})
export class HaAssistantGuaranteeComponent {

  @Input() hospitalAccident: HospitalAccident;

  assistantGuaranteeFile: Upload;

  onUploaded(file: Upload): void {
    this.assistantGuaranteeFile = file;
  }
}
