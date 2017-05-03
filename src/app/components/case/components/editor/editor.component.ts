/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';

@Component({
  selector: 'case-editor',
  templateUrl: './editor.html'
})
export class CaseEditorComponent {

  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('loadingBarCaseEditor') loadingBar: SlimLoadingBarComponent;

  accident: Accident;
  appliedTime: Date;
  maxDate: Date;

  private loadingControl: Array<string> = [];

  constructor (private route: ActivatedRoute, private accidentsService: AccidentsService) { }

  ngOnInit () {

    this.maxDate = new Date();
    this.appliedTime = new Date();

    this.loadingBar.show = false;
    if (this.route.params['id'] && this.route.params['id'] !== 'new' ) {
      this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) => this.accidentsService.getAccident(+params[ 'id' ]))
        .subscribe((accident: Accident) => {
          this.accident = accident ? accident : new Accident()
          this.appliedTime = new Date(this.accident.created_at);
        });
    } else {
      this.accident = new Accident;
    }
  }

  startLoading (): void {
    this.loadingBar.color = '#209e91';
    this.loadingBar.show = true;
    this.loadingBar.service.reset();
    this.loadingBar.service.start();
  }

  completeLoading (): void {
    this.loadingBar.service.complete();
    this.loadingBar.show = false;
  }

  errorLoading (): void {
    this.loadingBar.color = '#f89711';
  }

  onSubmit(): void {
    console.log('submit');
  }

  onLoading(key): void {
    if (this.loadingControl.indexOf(key) === -1){
      this.loadingControl.push(key);
      if (!this.loadingBar.show) {
        this.startLoading();
      }
    }
  }

  onLoaded(key): void {
    if (this.loadingBar.show) {
      const index = this.loadingControl.indexOf(key);
      if (index !== -1) {
        this.loadingControl.splice(index, 1);
      }
    }

    if (!this.loadingControl.length) {
      this.completeLoading();
    }
  }
}
