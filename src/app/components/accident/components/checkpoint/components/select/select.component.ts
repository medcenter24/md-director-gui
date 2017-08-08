/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccidentCheckpoint } from '../../checkpoint';
import { AccidentCheckpointsService } from '../../checkpoints.service';
@Component({
  selector: 'nga-checkpoints-selector',
  templateUrl: './select.html',
})
export class AccidentCheckpointsSelectorComponent implements OnInit {

  @Input() selectedCheckpoints: Array<number> = [];
  @Output() change: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  checkpoints: Array<AccidentCheckpoint> = [];
  isLoaded: boolean = false;

  constructor (private accidentCheckpointsService: AccidentCheckpointsService) {}

  ngOnInit () {
    this.init.emit('AccidentCheckpointsSelectorComponent');
    this.isLoaded = false;
    this.accidentCheckpointsService.getCheckpoints().then(checkpoints => {
      this.checkpoints = checkpoints;
      this.isLoaded = true;
      this.loaded.emit('AccidentCheckpointsSelectorComponent');
    }).catch(() => {
      this.loaded.emit('AccidentCheckpointsSelectorComponent');
    });
  }

  onChange(): void {
    this.change.emit(this.selectedCheckpoints);
  }
}
