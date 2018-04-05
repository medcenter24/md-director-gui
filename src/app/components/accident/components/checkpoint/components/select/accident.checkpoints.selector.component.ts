/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccidentCheckpoint } from '../../checkpoint';
import { AccidentCheckpointsService } from '../../checkpoints.service';
import { LoadableComponent } from '../../../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-checkpoints-selector',
  templateUrl: './select.html',
})
export class AccidentCheckpointsSelectorComponent extends LoadableComponent implements OnInit {

  @Input() selectedCheckpoints: number[] = [];
  @Output() change: EventEmitter<number[]> = new EventEmitter<number[]>();

  checkpoints: AccidentCheckpoint[] = [];
  isLoaded: boolean = false;

  protected componentName: string = 'AccidentCheckpointsSelectorComponent';

  constructor (private accidentCheckpointsService: AccidentCheckpointsService) { super(); }

  ngOnInit () {
    this.initComponent();
    this.isLoaded = false;
    this.accidentCheckpointsService.getCheckpoints().then(checkpoints => {
      this.checkpoints = checkpoints;
      this.isLoaded = true;
      this.loadedComponent();
    }).catch(() => {
      this.loadedComponent();
    });
  }

  onChange(): void {
    this.change.emit(this.selectedCheckpoints);
  }
}
