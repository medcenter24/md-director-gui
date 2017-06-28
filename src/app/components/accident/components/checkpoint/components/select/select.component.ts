/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AccidentCheckpoint } from '../../checkpoint';
import { AccidentCheckpointsService } from '../../checkpoints.service';
@Component({
  selector: 'nga-checkpoints-selector',
  templateUrl: './select.html',
})
export class AccidentCheckpointsSelectorComponent implements OnInit {

  @Input() selectedCheckpoints: Array<number> = [];
  @Output() change: EventEmitter<number[]> = new EventEmitter<number[]>();

  checkpoints: Array<AccidentCheckpoint> = [];
  isLoaded: boolean = false;

  constructor (private accidentCheckpointsService: AccidentCheckpointsService,
               private loadingBar: SlimLoadingBarService) {}

  ngOnInit () {
    this.loadingBar.start();
    this.isLoaded = false;
    this.accidentCheckpointsService.getCheckpoints().then(checkpoints => {
      this.checkpoints = checkpoints;
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch(() => {
      this.loadingBar.complete();
    });
  }

  onChange(): void {
    this.change.emit(this.selectedCheckpoints);
  }
}
